import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { LogOut, Search, Eye, Plus, Settings, ArrowUpDown } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import AdminNewOpportunityDialog from "@/components/AdminNewOpportunityDialog";
import AdminTemplatesTab from "@/components/AdminTemplatesTab";

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
  finished: "Finalizado",
};

type SortField = "created_at" | "client_name" | "event_date";
type SortDir = "asc" | "desc";

const AdminDashboard = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showArchived, setShowArchived] = useState(false);
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [loading, setLoading] = useState(true);
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from("opportunities").select("*").order("created_at", { ascending: false });
    if (data) setOpportunities(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let result = opportunities;

    // Archive filter
    if (!showArchived) {
      result = result.filter((o) => !(o as any).archived);
    } else {
      result = result.filter((o) => (o as any).archived);
    }

    // Search
    if (search) {
      result = result.filter((o) => o.client_name.toLowerCase().includes(search.toLowerCase()));
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((o) => (o.status || "new") === statusFilter);
    }

    // Sort
    result = [...result].sort((a, b) => {
      let valA: string | number = "";
      let valB: string | number = "";

      if (sortField === "created_at") {
        valA = a.created_at || "";
        valB = b.created_at || "";
      } else if (sortField === "client_name") {
        valA = a.client_name.toLowerCase();
        valB = b.client_name.toLowerCase();
      } else if (sortField === "event_date") {
        valA = a.event_date || "";
        valB = b.event_date || "";
      }

      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [opportunities, search, statusFilter, showArchived, sortField, sortDir]);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
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
          <div className="flex items-center gap-3">
            <img src="/barbie-kills-banda-eventos-casamentos-nav.webp" alt="Barbie Kills" className="h-8 w-auto" />
            <span className="font-bebas text-2xl tracking-wider text-foreground">CRM</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewDialogOpen(true)}
              className="border-neon-pink text-neon-pink hover:bg-neon-pink/10"
            >
              <Plus size={16} />
              <span className="hidden md:inline">Nova Oportunidade</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/settings")}
              className="border-muted-foreground text-muted-foreground hover:bg-muted/20"
            >
              <Settings size={16} />
              <span className="hidden md:inline">Config</span>
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground">
              <LogOut size={18} />
              <span className="hidden md:inline ml-2">Sair</span>
            </Button>
          </div>
        </div>

        <AdminNewOpportunityDialog open={newDialogOpen} onOpenChange={setNewDialogOpen} onCreated={fetchData} />

        <Tabs defaultValue="leads" className="mt-2">
          <TabsList className="w-full md:w-auto mb-6 bg-white/5 p-1 border border-white/10 rounded-lg">
            <TabsTrigger value="leads" className="px-8 font-bold data-[state=active]:bg-neon-pink uppercase text-xs">
              Leads
            </TabsTrigger>
            <TabsTrigger value="templates" className="px-8 font-bold data-[state=active]:bg-neon-pink uppercase text-xs">
              Catálogo BK
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            {/* Filters row */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nome do cliente..."
                  className="pl-9"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-44 border-white/10">
                  <SelectValue placeholder="Filtrar status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="new">Novo</SelectItem>
                  <SelectItem value="contacted">Contatado</SelectItem>
                  <SelectItem value="negotiating">Negociando</SelectItem>
                  <SelectItem value="won">Fechado</SelectItem>
                  <SelectItem value="lost">Perdido</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showArchived ? "default" : "outline"}
                size="sm"
                onClick={() => setShowArchived(!showArchived)}
                className={showArchived
                  ? "bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600/30"
                  : "border-white/10 text-muted-foreground hover:bg-white/5"
                }
              >
                {showArchived ? "Arquivados" : "Ativos"}
              </Button>
            </div>

            {/* Table */}
            {loading ? (
              <p className="text-muted-foreground">Carregando...</p>
            ) : filtered.length === 0 ? (
              <p className="text-muted-foreground">Nenhuma oportunidade encontrada.</p>
            ) : (
              <div className="glass-card rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-b border-white/10 hover:bg-transparent">
                      <TableHead
                        className="cursor-pointer select-none hover:text-white transition-colors"
                        onClick={() => toggleSort("client_name")}
                      >
                        <span className="flex items-center gap-1">
                          Cliente
                          <ArrowUpDown size={12} className={sortField === "client_name" ? "text-neon-pink" : "opacity-30"} />
                        </span>
                      </TableHead>
                      <TableHead className="hidden md:table-cell">Evento</TableHead>
                      <TableHead
                        className="hidden md:table-cell cursor-pointer select-none hover:text-white transition-colors"
                        onClick={() => toggleSort("event_date")}
                      >
                        <span className="flex items-center gap-1">
                          Data
                          <ArrowUpDown size={12} className={sortField === "event_date" ? "text-neon-pink" : "opacity-30"} />
                        </span>
                      </TableHead>
                      <TableHead className="hidden md:table-cell">Local</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead
                        className="w-16 cursor-pointer select-none hover:text-white transition-colors"
                        onClick={() => toggleSort("created_at")}
                      >
                        <span className="flex items-center gap-1">
                          <ArrowUpDown size={12} className={sortField === "created_at" ? "text-neon-pink" : "opacity-30"} />
                        </span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((opp) => (
                      <TableRow
                        key={opp.id}
                        className="cursor-pointer hover:bg-muted/30"
                        onClick={() => navigate(`/admin/opportunity/${opp.id}`)}
                      >
                        <TableCell className="font-medium">{opp.client_name}</TableCell>
                        <TableCell className="hidden md:table-cell">{opp.event_type || "—"}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {opp.event_date ? new Date(opp.event_date + "T00:00:00").toLocaleDateString("pt-BR") : "—"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{opp.location || "—"}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-2 py-0.5 text-xs rounded-full border ${statusColors[opp.status || "new"] || statusColors.new}`}
                          >
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
          </TabsContent>

          <TabsContent value="templates">
            <AdminTemplatesTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboard;
