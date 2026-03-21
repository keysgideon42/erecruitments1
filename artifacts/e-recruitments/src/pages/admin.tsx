import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useGetAdminStats, useListApplications, useUpdateApplicationStatus } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/status-badge";
import { FileText, Users, Briefcase, Building, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export function AdminDashboard() {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  if (!authLoading && (!user || !isAdmin)) {
    setLocation("/");
    return null;
  }

  const { data: stats, isLoading: statsLoading } = useGetAdminStats();
  const { data: applications, isLoading: appsLoading } = useListApplications();
  const updateStatus = useUpdateApplicationStatus();

  const handleStatusChange = async (appId: string, newStatus: string, email?: string | null, name?: string | null, title?: string) => {
    try {
      await updateStatus.mutateAsync({
        id: appId,
        data: {
          status: newStatus as any,
          applicant_email: email || undefined,
          applicant_name: name || undefined,
          job_title: title || undefined
        }
      });
      toast({ title: "Status Updated", description: "The applicant has been notified via email." });
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    } catch (err) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  if (authLoading || statsLoading || appsLoading) return <div className="p-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>;

  const chartData = stats?.by_status ? Object.entries(stats.by_status).map(([name, value]) => ({ name, value })) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Admin Dashboard</h1>
        <p className="text-slate-500">Platform overview and application management.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Total Applications", value: stats?.total_applications || 0, icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
          { title: "Active Jobs", value: stats?.total_jobs || 0, icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-100" },
          { title: "Organizations", value: stats?.total_organizations || 0, icon: Building, color: "text-purple-600", bg: "bg-purple-100" },
          { title: "Registered Users", value: stats?.total_users || 0, icon: Users, color: "text-amber-600", bg: "bg-amber-100" },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-0 shadow-lg shadow-slate-200/50 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-slate-500 font-medium text-sm">{stat.title}</p>
              <h3 className="text-3xl font-display font-bold text-slate-900">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg shadow-slate-200/50 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <h2 className="text-xl font-display font-bold text-slate-900">Recent Applications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 uppercase tracking-wider">
                    <th className="p-4 pl-6">Applicant</th>
                    <th className="p-4">Job Title</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 pr-6">Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications?.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors bg-white">
                      <td className="p-4 pl-6">
                        <div className="font-medium text-slate-900">{app.applicant_name}</div>
                        <div className="text-sm text-slate-500">{app.applicant_email}</div>
                      </td>
                      <td className="p-4 font-medium text-slate-700">{app.job?.title || '-'}</td>
                      <td className="p-4 text-slate-500">{format(new Date(app.submitted_at), 'MMM d')}</td>
                      <td className="p-4 pr-6">
                        <Select 
                          defaultValue={app.status} 
                          onValueChange={(val) => handleStatusChange(app.id, val, app.applicant_email, app.applicant_name, app.job?.title)}
                        >
                          <SelectTrigger className="w-40 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Received">Received</SelectItem>
                            <SelectItem value="Under Review">Under Review</SelectItem>
                            <SelectItem value="Forwarded">Forwarded</SelectItem>
                            <SelectItem value="Approved">Approved</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg shadow-slate-200/50 p-6 h-full">
            <h2 className="text-xl font-display font-bold text-slate-900 mb-6">Applications by Status</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
