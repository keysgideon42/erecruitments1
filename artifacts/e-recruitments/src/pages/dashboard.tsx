import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { useGetProfile, useListApplications, useListDocuments, useUploadDocument } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, UserCheck, Briefcase, Plus, UploadCloud, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [uploading, setUploading] = useState(false);
  const uploadDoc = useUploadDocument();

  // Redirect if not logged in (use effect to avoid setState-during-render)
  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
  }, [authLoading, user, setLocation]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const { data: profile, isLoading: profileLoading } = useGetProfile(user?.id || "", { query: { enabled: !!user } });
  const { data: applications, isLoading: appsLoading } = useListApplications({ user_id: user?.id }, { query: { enabled: !!user } });
  const { data: documents, isLoading: docsLoading } = useListDocuments(user?.id || "", { query: { enabled: !!user } });

  const calculateProfileProgress = () => {
    if (!profile) return 0;
    let score = 0;
    if (profile.full_name) score += 20;
    if (profile.phone) score += 10;
    if (profile.nationality) score += 10;
    if (profile.education) score += 20;
    if (profile.experience) score += 20;
    if (profile.skills) score += 20;
    return score;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'CV' | 'Certificate' | 'Cover Letter' | 'Other') => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      // 1. Upload to Supabase Storage
      const fileName = `${user.id}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { data, error } = await supabase.storage.from('documents').upload(fileName, file);
      if (error) throw error;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(data.path);

      // 3. Save to DB
      await uploadDoc.mutateAsync({
        data: {
          user_id: user.id,
          name: file.name,
          type: type as any,
          url: publicUrl,
          size: file.size
        }
      });

      toast({ title: "Success", description: "Document uploaded successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
    } catch (err: any) {
      toast({ title: "Upload Failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  if (authLoading || profileLoading) return <div className="p-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">My Dashboard</h1>
          <p className="text-slate-500">Welcome back, {profile?.full_name || user?.email}</p>
        </div>
        <Link href="/jobs">
          <Button className="h-12 px-6 rounded-xl shadow-md">Find Opportunities</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="col-span-1 md:col-span-2 border-0 shadow-lg shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary" /> Profile Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-slate-600">Completeness</span>
              <span className="text-primary">{calculateProfileProgress()}%</span>
            </div>
            <Progress value={calculateProfileProgress()} className="h-3 mb-6 bg-slate-200" />
            
            <div className="bg-blue-50 text-blue-900 p-4 rounded-xl text-sm flex justify-between items-center">
              <span>{profile?.is_complete ? 'Your profile is ready for applications!' : 'Complete your profile to unlock applying for jobs.'}</span>
              <Link href="/dashboard/profile">
                <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50">Edit Profile</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-accent" /> Activity Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600 font-medium">Applications</span>
              <span className="text-xl font-bold text-slate-900">{applications?.length || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600 font-medium">Documents</span>
              <span className="text-xl font-bold text-slate-900">{documents?.length || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="mb-8 p-1 bg-slate-100 rounded-xl h-14">
          <TabsTrigger value="applications" className="text-base rounded-lg h-10 px-8 data-[state=active]:shadow-sm">My Applications</TabsTrigger>
          <TabsTrigger value="documents" className="text-base rounded-lg h-10 px-8 data-[state=active]:shadow-sm">My Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 uppercase tracking-wider">
                    <th className="p-4 pl-6">Job Title</th>
                    <th className="p-4">Organization</th>
                    <th className="p-4">Applied On</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appsLoading ? (
                    <tr><td colSpan={4} className="p-6 text-center text-slate-500">Loading...</td></tr>
                  ) : applications?.length === 0 ? (
                    <tr><td colSpan={4} className="p-12 text-center text-slate-500">You haven't submitted any applications yet.</td></tr>
                  ) : (
                    applications?.map(app => (
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 pl-6 font-medium text-slate-900">
                          <Link href={`/jobs/${app.job_id}`} className="hover:text-primary">
                            {app.job?.title || 'Unknown Job'}
                          </Link>
                        </td>
                        <td className="p-4 text-slate-600">{app.job?.organization?.name || '-'}</td>
                        <td className="p-4 text-slate-600">{format(new Date(app.submitted_at), 'MMM d, yyyy')}</td>
                        <td className="p-4"><StatusBadge status={app.status} /></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-1 border-dashed border-2 border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-8 text-center rounded-2xl relative overflow-hidden group">
              {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Upload Document</h3>
              <p className="text-xs text-slate-500 mb-6">PDF, DOCX up to 5MB</p>
              
              <div className="relative">
                <Button variant="outline" className="relative z-0">Choose File</Button>
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  onChange={(e) => handleFileUpload(e, 'CV')}
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </Card>

            <div className="md:col-span-3 space-y-4">
              {docsLoading ? (
                <div className="text-slate-500">Loading documents...</div>
              ) : documents?.length === 0 ? (
                <div className="p-12 text-center text-slate-500 bg-white border border-slate-200 rounded-2xl">
                  No documents uploaded yet. Add your CV to speed up your applications.
                </div>
              ) : (
                documents?.map(doc => (
                  <Card key={doc.id} className="p-4 flex items-center justify-between group hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{doc.name}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="bg-slate-100 px-2 py-0.5 rounded uppercase font-bold">{doc.type}</span>
                          <span>{format(new Date(doc.uploaded_at), 'MMM d, yyyy')}</span>
                          {doc.size && <span>{(doc.size / 1024 / 1024).toFixed(2)} MB</span>}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">View</a>
                    </Button>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
