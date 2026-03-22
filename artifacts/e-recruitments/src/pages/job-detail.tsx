import { useRoute, Link, useLocation } from "wouter";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useGetJob, useSubmitApplication, useGetProfile } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Building, MapPin, Calendar, Clock, ChevronLeft, AlertCircle,
  Loader2, CheckCircle2, ListChecks, Star, Gift, ExternalLink, Globe,
} from "lucide-react";
import { OrgAvatar } from "@/components/org-avatar";
import { format } from "date-fns";

function parseDescription(raw: string) {
  const sections: { heading: string; icon: React.ReactNode; content: string }[] = [];
  const sectionMap: Record<string, { icon: React.ReactNode; label: string }> = {
    "OVERVIEW": { icon: <Globe className="w-5 h-5" />, label: "Overview" },
    "KEY RESPONSIBILITIES": { icon: <ListChecks className="w-5 h-5" />, label: "Key Responsibilities" },
    "REQUIRED QUALIFICATIONS": { icon: <CheckCircle2 className="w-5 h-5" />, label: "Required Qualifications" },
    "PREFERRED QUALIFICATIONS": { icon: <Star className="w-5 h-5" />, label: "Preferred Qualifications" },
    "WHAT WE OFFER": { icon: <Gift className="w-5 h-5" />, label: "What We Offer" },
  };

  const keys = Object.keys(sectionMap);
  const pattern = new RegExp(`(${keys.join("|")})`, "g");
  const parts = raw.split(pattern).filter(Boolean);

  let current: string | null = null;
  let buffer: string[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (sectionMap[trimmed]) {
      if (current && buffer.length) {
        sections.push({
          heading: sectionMap[current].label,
          icon: sectionMap[current].icon,
          content: buffer.join("").trim(),
        });
        buffer = [];
      }
      current = trimmed;
    } else {
      buffer.push(part);
    }
  }
  if (current && buffer.length) {
    sections.push({
      heading: sectionMap[current].label,
      icon: sectionMap[current].icon,
      content: buffer.join("").trim(),
    });
  }
  return sections.length > 0 ? sections : null;
}

export function JobDetail() {
  const [, params] = useRoute("/jobs/:id");
  const id = params?.id || "";
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  const { data: job, isLoading } = useGetJob(id);
  const { data: profile } = useGetProfile(user?.id || "", { query: { enabled: !!user } });
  const submitApp = useSubmitApplication();

  const [coverLetter, setCoverLetter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) return (
    <div className="p-20 text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
    </div>
  );
  if (!job) return (
    <div className="p-20 text-center text-slate-500">Job not found.</div>
  );

  const sections = parseDescription(job.description);

  const handleApply = async () => {
    if (!user) return;
    try {
      await submitApp.mutateAsync({
        data: {
          job_id: job.id,
          user_id: user.id,
          applicant_email: user.email || profile?.email || "",
          applicant_name: profile?.full_name || user.email?.split("@")[0] || "Applicant",
          cover_letter: coverLetter,
        },
      });
      toast({ title: "Application Submitted", description: "Your application has been received successfully." });
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
    } catch (err: any) {
      toast({ title: "Submission Failed", description: err.message || "Please try again later.", variant: "destructive" });
    }
  };

  const org = job.organization;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/jobs" className="inline-flex items-center text-slate-500 hover:text-primary transition-colors mb-8 font-medium">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to all jobs
      </Link>

      {/* Hero card */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider rounded-full">
            {job.sector}
          </span>
          <span className="px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-bold uppercase tracking-wider rounded-full">
            {job.employment_type}
          </span>
          {org?.type === "UN" && (
            <span className="px-4 py-1.5 bg-blue-600 text-white text-sm font-bold uppercase tracking-wider rounded-full">
              UN Agency
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-8 leading-tight">
          {job.title}
        </h1>

        {/* Meta grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-100 mb-8">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" /> Organization
            </p>
            <p className="font-bold text-slate-900">{org?.name || "Partner Organization"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Location
            </p>
            <p className="font-bold text-slate-900">{job.location}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Posted
            </p>
            <p className="font-bold text-slate-900">{format(new Date(job.created_at), "MMM d, yyyy")}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Deadline
            </p>
            <p className="font-bold text-amber-600">
              {job.deadline ? format(new Date(job.deadline), "MMM d, yyyy") : "Open until filled"}
            </p>
          </div>
        </div>

        {/* Structured content or fallback */}
        {sections ? (
          <div className="space-y-8">
            {sections.map((sec) => (
              <div key={sec.heading}>
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
                  <span className="text-primary">{sec.icon}</span>
                  {sec.heading}
                </h3>
                <div className="text-slate-700 leading-relaxed whitespace-pre-line text-[15px]">
                  {sec.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
            {job.description}
          </div>
        )}
      </div>

      {/* Organization info card */}
      {org && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm mb-8">
          <h3 className="text-base font-bold text-slate-500 uppercase tracking-wider mb-5">About the Organization</h3>
          <div className="flex items-start gap-5">
            <OrgAvatar name={org.name} logoUrl={org.logo_url} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-xl font-bold text-slate-900">{org.name}</h4>
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                  org.type === "UN"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {org.type === "UN" ? "UN Agency" : "NGO"}
                </span>
              </div>
              {org.description && (
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{org.description}</p>
              )}
              {org.website && (
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline"
                >
                  <ExternalLink className="w-4 h-4" /> Visit Organization Website
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sticky apply bar */}
      <div className="sticky bottom-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)] border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-lg">Ready to make an impact?</h4>
          <p className="text-slate-500 text-sm">
            {!user ? "Create a free account to apply for this position." : "Submit your application today."}
          </p>
        </div>

        {!user ? (
          <div className="flex gap-3 w-full sm:w-auto">
            <Link href={`/register?redirect=/jobs/${job.id}`} className="flex-1 sm:flex-none">
              <Button size="lg" className="w-full h-13 px-8 text-base rounded-xl shadow-lg shadow-primary/20 font-bold">
                Create Account to Apply
              </Button>
            </Link>
            <Link href={`/login?redirect=/jobs/${job.id}`} className="flex-1 sm:flex-none">
              <Button size="lg" variant="outline" className="w-full h-13 px-6 text-base rounded-xl">
                Sign In
              </Button>
            </Link>
          </div>
        ) : profile?.is_complete === false ? (
          <Link href="/dashboard/profile">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto h-13 px-10 text-base bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-xl font-semibold">
              <AlertCircle className="w-5 h-5 mr-2" /> Complete Profile to Apply
            </Button>
          </Link>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="w-full sm:w-auto h-13 px-10 text-base rounded-xl shadow-lg shadow-primary/20 font-bold">
                Apply for this Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display">Apply for {job.title}</DialogTitle>
                <DialogDescription className="text-base text-slate-500 mt-1">
                  at <strong className="text-slate-700">{org?.name}</strong> — {job.location}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 mb-4 p-4 bg-slate-50 rounded-xl text-sm text-slate-600">
                Your profile information and uploaded documents will be automatically attached to this application.
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover-letter" className="text-sm font-semibold">
                  Cover Letter <span className="text-slate-400 font-normal">(optional but recommended)</span>
                </Label>
                <Textarea
                  id="cover-letter"
                  placeholder="Tell the organization why you are the perfect fit for this role..."
                  className="h-36 resize-none bg-slate-50 text-sm"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="h-11 px-6">
                  Cancel
                </Button>
                <Button
                  onClick={handleApply}
                  disabled={submitApp.isPending}
                  className="h-11 px-8 rounded-xl shadow-lg shadow-primary/20 font-semibold"
                >
                  {submitApp.isPending ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
