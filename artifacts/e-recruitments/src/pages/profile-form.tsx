import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetProfile, useUpsertProfile } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Loader2, Save } from "lucide-react";
import { Link } from "wouter";

const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Valid phone number required"),
  nationality: z.string().min(2, "Nationality required"),
  date_of_birth: z.string().min(10, "DOB required"),
  address: z.string().min(5, "Address required"),
  bio: z.string().min(10, "Please provide a short bio"),
  linkedin_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  education: z.string().min(5, "Education details required"),
  experience: z.string().min(5, "Experience details required"),
  skills: z.string().min(3, "Skills required"),
  languages: z.string().min(3, "Languages required"),
});

export function ProfileForm() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading: isFetching } = useGetProfile(user?.id || "", { query: { enabled: !!user } });
  const upsert = useUpsertProfile();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "", email: "", phone: "", nationality: "", date_of_birth: "",
      address: "", bio: "", linkedin_url: "", education: "", experience: "",
      skills: "", languages: ""
    }
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name || "",
        email: profile.email || user?.email || "",
        phone: profile.phone || "",
        nationality: profile.nationality || "",
        date_of_birth: profile.date_of_birth || "",
        address: profile.address || "",
        bio: profile.bio || "",
        linkedin_url: profile.linkedin_url || "",
        education: profile.education || "",
        experience: profile.experience || "",
        skills: profile.skills || "",
        languages: profile.languages || "",
      });
    } else if (user?.email) {
      form.setValue("email", user.email);
    }
  }, [profile, user, form]);

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    if (!user) return;
    try {
      await upsert.mutateAsync({
        userId: user.id,
        data: data
      });
      toast({ title: "Profile Saved", description: "Your profile has been updated successfully." });
      queryClient.invalidateQueries({ queryKey: [`/api/profiles/${user.id}`] });
      setLocation("/dashboard");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (!user) return null;
  if (isFetching) return <div className="p-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/dashboard" className="inline-flex items-center text-slate-500 hover:text-primary mb-8 font-medium">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">Complete Your Profile</h1>
        <p className="text-slate-600 text-lg">A complete profile increases your chances of getting noticed by recruiters.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-8 border-0 shadow-lg shadow-slate-200/50 rounded-2xl">
          <h2 className="text-xl font-display font-bold mb-6 text-primary border-b border-slate-100 pb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input {...form.register("full_name")} className="h-12 bg-slate-50" />
              {form.formState.errors.full_name && <p className="text-sm text-red-500">{form.formState.errors.full_name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Email Address *</Label>
              <Input {...form.register("email")} className="h-12 bg-slate-50" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input {...form.register("phone")} className="h-12 bg-slate-50" />
            </div>
            <div className="space-y-2">
              <Label>Nationality *</Label>
              <Input {...form.register("nationality")} className="h-12 bg-slate-50" />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth *</Label>
              <Input type="date" {...form.register("date_of_birth")} className="h-12 bg-slate-50" />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input {...form.register("linkedin_url")} className="h-12 bg-slate-50" placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Current Address *</Label>
              <Input {...form.register("address")} className="h-12 bg-slate-50" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Professional Summary (Bio) *</Label>
              <Textarea {...form.register("bio")} className="h-32 bg-slate-50 resize-none" placeholder="Briefly describe your professional background and goals..." />
            </div>
          </div>
        </Card>

        <Card className="p-8 border-0 shadow-lg shadow-slate-200/50 rounded-2xl">
          <h2 className="text-xl font-display font-bold mb-6 text-primary border-b border-slate-100 pb-4">Professional Details</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label>Education *</Label>
              <Textarea {...form.register("education")} className="h-32 bg-slate-50" placeholder="E.g., Master of International Relations, University of..." />
            </div>
            <div className="space-y-2">
              <Label>Work Experience *</Label>
              <Textarea {...form.register("experience")} className="h-40 bg-slate-50" placeholder="List your relevant work experience..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Skills *</Label>
                <Textarea {...form.register("skills")} className="h-24 bg-slate-50" placeholder="Project Management, Data Analysis..." />
              </div>
              <div className="space-y-2">
                <Label>Languages *</Label>
                <Textarea {...form.register("languages")} className="h-24 bg-slate-50" placeholder="English (Fluent), French (Intermediate)..." />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={upsert.isPending} className="h-14 px-10 text-lg rounded-xl shadow-lg shadow-primary/30">
            {upsert.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
