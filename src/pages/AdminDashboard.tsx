import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { LogOut, Search, Eye, Plus } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import AdminNewOpportunityDialog from "@/components/AdminNewOpportunityDialog";

type Opportunity = Tables<"opportunities">;

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  negotiating: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  won: "bg-green-500/20 text-green-300 border-green-500/30",
  lost: "bg-red-500/20 text-red-300 border-red-500/30",
};

const statusLabel: Record<string, string> = {
  new: "Novo",
  contacted: "Contatado",
  negotiating: "Negociando",
  won: "Fechado",
  lost: "Perdido",
};

const AdminDashboard = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setOpportunities(data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(
    () =>
      opportunities.filter((o) =>
        o.client_name.toLowerCase().includes(search.toLowerCase())
      ),
    [opportunities, search]
  );

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>CRM | Barbie Kills Admin</title>
      </Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bebas text-3xl md:text-4xl tracking-wider text-foreground">
            CRM BARBIE KILLS
          </h1>
          <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground">
            <LogOut size={18} />
            <span className="hidden md:inline ml-2">Sair</span>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome do cliente..."
            className="pl-9"
          />
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma oportunidade encontrada.</p>
        ) : (
          <div className="glass-card rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden md:table-cell">Evento</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                  <TableHead className="hidden md:table-cell">Local</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((opp) => (
                  <TableRow key={opp.id} className="cursor-pointer hover:bg-muted/30" onClick={() => navigate(`/admin/opportunity/${opp.id}`)}>
                    <TableCell className="font-medium">{opp.client_name}</TableCell>
                    <TableCell className="hidden md:table-cell">{opp.event_type || "—"}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {opp.event_date
                        ? new Date(opp.event_date + "T00:00:00").toLocaleDateString("pt-BR")
                        : "—"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{opp.location || "—"}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full border ${statusColors[opp.status || "new"] || statusColors.new}`}>
                        {statusLabel[opp.status || "new"] || opp.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Eye size={16} className="text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
