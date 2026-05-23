import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Client Login — MagicLight Photography" },
      { name: "description", content: "Sign in to your MagicLight client account to book packages." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to confirm, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/dashboard" });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-5 py-16">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Camera className="h-7 w-7 text-ink" strokeWidth={2.2} />
          <span className="font-display text-3xl font-bold text-ink">
            Magic<span className="text-primary">Light</span><span className="text-primary">.</span>
          </span>
        </Link>

        <div className="bg-white rounded-2xl shadow-[var(--shadow-elevated)] p-8 md:p-10 border border-border">
          <h1 className="font-display text-3xl font-bold text-ink text-center">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {mode === "signin"
              ? "Sign in to book your graduation packages."
              : "Join MagicLight to book packages online."}
          </p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-ink">Email</label>
              <input
                type="email" required autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-ink">Password</label>
              <input
                type="password" required minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" disabled={busy} className="btn-primary w-full !mt-6 disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New to MagicLight?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-primary font-semibold hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-ink">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
