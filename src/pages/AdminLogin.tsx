import { useState } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { toast } from "sonner";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  if (isAuthenticated()) {
    navigate("/admin", { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success("Acesso autorizado!");
      navigate("/admin", { replace: true });
    } else {
      toast.error("Senha incorreta.");
      setPassword("");
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin Login | Barbie Kills</title>
      </Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-lg p-8 w-full max-w-sm flex flex-col gap-6"
        >
          <div className="text-center">
            <h1 className="font-bebas text-3xl tracking-wider text-foreground">
              ÁREA RESTRITA
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Insira a senha de administrador
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-pw">Senha</Label>
            <Input
              id="admin-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>
          <Button type="submit" variant="neonPink" className="w-full">
            Entrar
          </Button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
