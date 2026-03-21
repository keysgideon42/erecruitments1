import { useRoute, Link } from "wouter";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useGetJob, useSubmitApplication, useGetProfile } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Building, MapPin, Calendar, Clock, ChevronLeft, AlertCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";

export function JobDetail() {
  const [, params] = useRoute("/jobs/:id");
  const id = params?.id || "";
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: job, isLoading } = useGetJob(id);
  const { data: profile } = useGetProfile(user?.id || "", { query: { enabled: !!user } });
  const submitApp = useSubmitApplication();
  
  const [coverLetter, setCoverLetter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) return <div className="p-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>;
  if (!job) return <div className="p-20 text-center">Job not found</div>;

  const handleApply = async () => {
    if (!user) return; // protected by UI button state
    
    try {
      await submitApp.mutateAsync({
        data: {
          job_id: job.id,
          user_id: user.id,
          applicant_email: user.email || profile?.email || "",
          applicant_name: profile?.full_name || user.email?.split('@')[0] || "Applicant",
          cover_letter: coverLetter
        }
      });
      
      toast({ title: "Application Submitted", description: "Your application has been received successfully." });
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
    } catch (err: any) {
      toast({ title: "Submission Failed", description: err.message || "Please try again later.", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/jobs" className="inline-flex items-center text-slate-500 hover:text-primary transition-colors mb-8 font-medium">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to all jobs
      </Link>
      
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider rounded-full">
            {job.sector}
          </span>
          <span className="px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-bold uppercase tracking-wider rounded-full">
            {job.employment_type}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8">{job.title}</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-100 mb-8">
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1 flex items-center gap-1.5"><Building className="w-4 h-4"/> Organization</p>
            <p className="font-semibold text-slate-900">{job.organization?.name || 'Partner Org'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1 flex items-center gap-1.5"><MapPin className="w-4 h-4"/> Location</p>
            <p className="font-semibold text-slate-900">{job.location}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1 flex items-center gap-1.5"><Clock className="w-4 h-4"/> Posted</p>
            <p className="font-semibold text-slate-900">{format(new Date(job.created_at), 'MMM d, yyyy')}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1 flex items-center gap-1.5"><Calendar className="w-4 h-4"/> Deadline</p>
            <p className="font-semibold text-amber-600">{job.deadline ? format(new Date(job.deadline), 'MMM d, yyyy') : 'Open until filled'}</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-slate-900 prose-a:text-primary">
          <h3 className="text-2xl font-bold mb-4">Job Description</h3>
          <div className="whitespace-pre-line text-slate-700 leading-relaxed text-lg">
            {job.description}
          </div>
        </div>
      </div>

      <div className="sticky bottom-6 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="font-semibold text-slate-900">Ready to make an impact?</h4>
          <p className="text-slate-500 text-sm">Submit your application today.</p>
        </div>
        
        {!user ? (
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg rounded-xl shadow-lg shadow-primary/20">Sign in to Apply</Button>
          </Link>
        ) : profile?.is_complete === false ? (
          <Link href="/dashboard/profile">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-10 text-lg bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-xl">
              <AlertCircle className="w-5 h-5 mr-2" /> Complete Profile to Apply
            </Button>
          </Link>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg rounded-xl shadow-lg shadow-primary/20">
                Apply Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display">Apply for {job.title}</DialogTitle>
                <DialogDescription className="text-base">
                  Your profile information and uploaded documents will be automatically attached to this application.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 my-6">
                <div className="space-y-2">
                  <Label htmlFor="cover-letter" className="text-base">Cover Letter (Optional but recommended)</Label>
                  <Textarea 
                    id="cover-letter" 
                    placeholder="Tell the organization why you are the perfect fit for this role..."
                    className="h-40 resize-none bg-slate-50"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="h-12 px-6">Cancel</Button>
                <Button onClick={handleApply} disabled={submitApp.isPending} className="h-12 px-8 rounded-xl shadow-lg shadow-primary/20">
                  {submitApp.isPending ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
