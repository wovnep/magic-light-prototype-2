import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Camera, ShoppingCart, LogOut, Check, Plus, Minus, Trash2, Loader2, Sparkles, X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Client Dashboard — MagicLight Photography" },
      { name: "description", content: "Browse photography packages and submit your booking request." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: Dashboard,
});

type Package = {
  id: string; name: string; price: number; description: string | null;
  items: string[]; featured: boolean; badge: string | null; sort_order: number;
};
type CartRow = { id: string; package_id: string; quantity: number };

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [cart, setCart] = useState<CartRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/login" });
  }, [user, authLoading, navigate]);

  const loadAll = async () => {
    if (!user) return;
    const [{ data: pkgs }, { data: cartRows }] = await Promise.all([
      supabase.from("packages").select("*").order("sort_order"),
      supabase.from("cart_items").select("id, package_id, quantity").eq("user_id", user.id),
    ]);
    setPackages((pkgs as Package[]) ?? []);
    setCart((cartRows as CartRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { if (user) loadAll(); /* eslint-disable-next-line */ }, [user]);

  const pkgById = useMemo(() => Object.fromEntries(packages.map(p => [p.id, p])), [packages]);
  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);
  const cartTotal = cart.reduce((s, c) => s + (pkgById[c.package_id]?.price ?? 0) * c.quantity, 0);

  const featured = packages.filter(p => p.sort_order < 10);
  const alaCarte = packages.filter(p => p.sort_order >= 10);

  const addToCart = async (pkg: Package) => {
    if (!user) return;
    const existing = cart.find(c => c.package_id === pkg.id);
    if (existing) {
      const { error } = await supabase.from("cart_items")
        .update({ quantity: existing.quantity + 1 }).eq("id", existing.id);
      if (error) return toast.error(error.message);
      setCart(cart.map(c => c.id === existing.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      const { data, error } = await supabase.from("cart_items")
        .insert({ user_id: user.id, package_id: pkg.id, quantity: 1 })
        .select("id, package_id, quantity").single();
      if (error) return toast.error(error.message);
      setCart([...cart, data as CartRow]);
    }
    toast.success(`${pkg.name} added to cart`);
  };

  const updateQty = async (row: CartRow, delta: number) => {
    const next = row.quantity + delta;
    if (next < 1) return removeItem(row);
    const { error } = await supabase.from("cart_items").update({ quantity: next }).eq("id", row.id);
    if (error) return toast.error(error.message);
    setCart(cart.map(c => c.id === row.id ? { ...c, quantity: next } : c));
  };

  const removeItem = async (row: CartRow) => {
    const { error } = await supabase.from("cart_items").delete().eq("id", row.id);
    if (error) return toast.error(error.message);
    setCart(cart.filter(c => c.id !== row.id));
  };

  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitBooking = async () => {
    if (!user || cart.length === 0) return;
    setSubmitting(true);
    const items = cart.map(c => ({
      package_id: c.package_id,
      name: pkgById[c.package_id]?.name,
      price: pkgById[c.package_id]?.price,
      quantity: c.quantity,
    }));
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id, items, total: cartTotal,
      contact_phone: phone || null, notes: notes || null,
    });
    if (error) { setSubmitting(false); return toast.error(error.message); }
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    setCart([]); setPhone(""); setNotes(""); setCartOpen(false);
    setSubmitting(false);
    toast.success("Booking request submitted! We'll contact you shortly.");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container-px mx-auto max-w-7xl h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-ink" strokeWidth={2.2} />
            <span className="font-display text-2xl font-bold text-ink">
              Magic<span className="text-primary">Light</span><span className="text-primary">.</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="hidden md:block text-sm text-muted-foreground truncate max-w-[200px]">
              {user?.email}
            </span>
            <button
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center gap-2 rounded-lg bg-ink text-white px-4 py-2 text-sm font-semibold hover:bg-ink/90 transition"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={signOut} className="p-2 text-muted-foreground hover:text-ink" aria-label="Sign out">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero strip */}
      <section className="bg-ink text-white">
        <div className="container-px mx-auto max-w-7xl py-12 md:py-16">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-primary font-semibold">
            <Sparkles className="h-4 w-4" /> Client Dashboard
          </span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Photography Packages
          </h1>
          <p className="mt-3 text-white/75 max-w-2xl">
            Browse our graduation packages and add to your cart. Submit a booking request when you're ready —
            our team will reach out to confirm your date and details.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="container-px mx-auto max-w-7xl py-14">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-ink">Complete Packages</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6 items-start">
          {featured.map(p => {
            const inCart = cart.find(c => c.package_id === p.id);
            return (
              <div
                key={p.id}
                className={`relative rounded-2xl p-7 transition-all ${
                  p.featured
                    ? "bg-ink text-white shadow-[var(--shadow-elevated)] ring-2 ring-primary"
                    : "bg-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)]"
                }`}
              >
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                    {p.badge}
                  </div>
                )}
                <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{p.name}</div>
                <div className={`mt-2 font-display text-4xl font-bold ${p.featured ? "text-white" : "text-ink"}`}>
                  Rs. {Number(p.price).toLocaleString()}
                </div>
                <ul className="mt-6 space-y-2.5">
                  {p.items.map(it => (
                    <li key={it} className="flex gap-2.5 text-sm items-start">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className={p.featured ? "text-white/90" : "text-ink/85"}>{it}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => addToCart(p)}
                  className={`mt-7 w-full ${p.featured ? "btn-primary" : "btn-outline-orange"}`}
                >
                  {inCart ? `In Cart (${inCart.quantity}) — Add more` : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mt-20">À La Carte</h2>
        <p className="text-sm text-muted-foreground mt-1">Add individual prints or soft copies anytime.</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alaCarte.map(p => {
            const inCart = cart.find(c => c.package_id === p.id);
            return (
              <div key={p.id} className="bg-white rounded-xl border border-border p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-semibold text-ink truncate">{p.name}</div>
                  <div className="text-primary font-bold text-lg mt-0.5">Rs. {Number(p.price).toLocaleString()}/-</div>
                </div>
                <button
                  onClick={() => addToCart(p)}
                  className="shrink-0 inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition"
                >
                  <Plus className="h-4 w-4" />
                  {inCart ? inCart.quantity : "Add"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold text-ink">Your Cart</h3>
              <button onClick={() => setCartOpen(false)} className="p-1.5 text-muted-foreground hover:text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
              {cart.length === 0 && (
                <p className="text-center text-muted-foreground py-12">Your cart is empty.</p>
              )}
              {cart.map(row => {
                const p = pkgById[row.package_id];
                if (!p) return null;
                return (
                  <div key={row.id} className="rounded-xl border border-border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-ink">{p.name}</div>
                        <div className="text-sm text-primary font-bold">Rs. {Number(p.price).toLocaleString()}</div>
                      </div>
                      <button onClick={() => removeItem(row)} className="text-muted-foreground hover:text-destructive p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 inline-flex items-center rounded-lg border border-border">
                      <button onClick={() => updateQty(row, -1)} className="px-2.5 py-1.5 hover:bg-surface">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 text-sm font-semibold w-8 text-center">{row.quantity}</span>
                      <button onClick={() => updateQty(row, 1)} className="px-2.5 py-1.5 hover:bg-surface">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border p-6 space-y-4 bg-surface">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink">Contact phone</label>
                  <input
                    value={phone} onChange={e => setPhone(e.target.value)} maxLength={30}
                    placeholder="+94 ..."
                    className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink">Notes (optional)</label>
                  <textarea
                    value={notes} onChange={e => setNotes(e.target.value)} maxLength={500} rows={2}
                    placeholder="Convocation date, university, etc."
                    className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-display text-2xl font-bold text-ink">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={submitBooking} disabled={submitting}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Submit Booking Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
