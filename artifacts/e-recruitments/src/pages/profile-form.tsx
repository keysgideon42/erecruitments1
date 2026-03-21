import { useEffect, useState } from "react";
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
import { ChevronLeft, ChevronRight, Loader2, Save, User, Briefcase, Languages, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { id: 1, title: "Personal Info", icon: User, description: "Basic personal details" },
  { id: 2, title: "Professional", icon: Briefcase, description: "Education & experience" },
  { id: 3, title: "Skills", icon: Languages, description: "Skills & languages" },
];

const personalSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Valid phone number required"),
  nationality: z.string().min(2, "Nationality required"),
  date_of_birth: z.string().min(10, "Date of birth required"),
  address: z.string().min(5, "Address required"),
});

const professionalSchema = z.object({
  bio: z.string().min(10, "Please provide a short professional summary (min 10 chars)"),
  linkedin_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  education: z.string().min(5, "Education details required"),
  experience: z.string().min(5, "Work experience required"),
});

const skillsSchema = z.object({
  skills: z.string().min(3, "List at least one skill"),
  languages: z.string().min(3, "List at least one language"),
});

const fullSchema = personalSchema.merge(professionalSchema).merge(skillsSchema);
type FormData = z.infer<typeof fullSchema>;

const stepSchemas = [personalSchema, professionalSchema, skillsSchema];

export function ProfileForm() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const { data: profile, isLoading: isFetching } = useGetProfile(user?.id || "", { query: { enabled: !!user } });
  const upsert = useUpsertProfile();

  const form = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: "onChange",
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
      const filled: number[] = [];
      if (profile.full_name && profile.phone && profile.nationality) filled.push(0);
      if (profile.education && profile.experience) filled.push(1);
      if (profile.skills && profile.languages) filled.push(2);
      setCompletedSteps(filled);
    } else if (user?.email) {
      form.setValue("email", user.email);
    }
  }, [profile, user]);

  const validateCurrentStep = async () => {
    const stepFields: Record<number, (keyof FormData)[]> = {
      0: ["full_name", "email", "phone", "nationality", "date_of_birth", "address"],
      1: ["bio", "education", "experience"],
      2: ["skills", "languages"],
    };
    const fields = stepFields[currentStep] || [];
    const result = await form.trigger(fields);
    return result;
  };

  const handleNext = async () => {
    const valid = await validateCurrentStep();
    if (!valid) return;
    setCompletedSteps(prev => Array.from(new Set([...prev, currentStep])));
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: FormData) => {
    const valid = await validateCurrentStep();
    if (!valid) return;
    if (!user) return;
    try {
      await upsert.mutateAsync({ userId: user.id, data });
      setCompletedSteps([0, 1, 2]);
      toast({ title: "Profile Saved", description: "Your profile has been updated successfully." });
      queryClient.invalidateQueries({ queryKey: [`/api/profiles/${user.id}`] });
      setTimeout(() => setLocation("/dashboard"), 1000);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (!user) return null;
  if (isFetching) return (
    <div className="p-20 text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/dashboard" className="inline-flex items-center text-slate-500 hover:text-primary mb-8 font-medium transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">Complete Your Profile</h1>
        <p className="text-slate-600 text-lg">A complete profile increases your chances of getting noticed by recruiters.</p>
      </div>

      {/* Step Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary z-0 transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = index === currentStep;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  if (index < currentStep || isCompleted) setCurrentStep(index);
                }}
                className="relative z-10 flex flex-col items-center gap-2 group"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary border-primary text-white"
                    : isActive
                    ? "bg-white border-primary text-primary"
                    : "bg-white border-slate-300 text-slate-400"
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className="text-center hidden sm:block">
                  <p className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-primary" : isCompleted ? "text-slate-700" : "text-slate-400"}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-400">{step.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="p-8 border-0 shadow-lg shadow-slate-200/50 rounded-2xl">
                <h2 className="text-xl font-display font-bold mb-1 text-slate-900">Personal Information</h2>
                <p className="text-slate-500 text-sm mb-8">Tell us who you are. This is used on your application profile.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input {...form.register("full_name")} className="h-12 bg-slate-50" placeholder="Jane Doe" />
                    {form.formState.errors.full_name && <p className="text-sm text-red-500">{form.formState.errors.full_name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address *</Label>
                    <Input {...form.register("email")} className="h-12 bg-slate-50 opacity-70" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number *</Label>
                    <Input {...form.register("phone")} className="h-12 bg-slate-50" placeholder="+1 555 000 0000" />
                    {form.formState.errors.phone && <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Nationality *</Label>
                    <Input {...form.register("nationality")} className="h-12 bg-slate-50" placeholder="e.g., Kenyan" />
                    {form.formState.errors.nationality && <p className="text-sm text-red-500">{form.formState.errors.nationality.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth *</Label>
                    <Input type="date" {...form.register("date_of_birth")} className="h-12 bg-slate-50" />
                    {form.formState.errors.date_of_birth && <p className="text-sm text-red-500">{form.formState.errors.date_of_birth.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn URL</Label>
                    <Input {...form.register("linkedin_url")} className="h-12 bg-slate-50" placeholder="https://linkedin.com/in/..." />
                    {form.formState.errors.linkedin_url && <p className="text-sm text-red-500">{form.formState.errors.linkedin_url.message}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Current Address *</Label>
                    <Input {...form.register("address")} className="h-12 bg-slate-50" placeholder="City, Country" />
                    {form.formState.errors.address && <p className="text-sm text-red-500">{form.formState.errors.address.message}</p>}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="p-8 border-0 shadow-lg shadow-slate-200/50 rounded-2xl">
                <h2 className="text-xl font-display font-bold mb-1 text-slate-900">Professional Details</h2>
                <p className="text-slate-500 text-sm mb-8">Your experience and education help organizations match you to the right role.</p>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Professional Summary *</Label>
                    <Textarea
                      {...form.register("bio")}
                      className="h-28 bg-slate-50 resize-none"
                      placeholder="Briefly describe your professional background, key achievements, and career goals..."
                    />
                    {form.formState.errors.bio && <p className="text-sm text-red-500">{form.formState.errors.bio.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Education *</Label>
                    <Textarea
                      {...form.register("education")}
                      className="h-32 bg-slate-50 resize-none"
                      placeholder="E.g., Master of International Relations — University of Geneva (2018)&#10;B.Sc. Development Studies — University of Nairobi (2015)"
                    />
                    {form.formState.errors.education && <p className="text-sm text-red-500">{form.formState.errors.education.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Work Experience *</Label>
                    <Textarea
                      {...form.register("experience")}
                      className="h-40 bg-slate-50 resize-none"
                      placeholder="List your relevant work experience in reverse chronological order:&#10;&#10;Programme Officer — UNHCR (2020–Present)&#10;- Led field operations in East Africa...&#10;&#10;Field Coordinator — IRC (2018–2020)..."
                    />
                    {form.formState.errors.experience && <p className="text-sm text-red-500">{form.formState.errors.experience.message}</p>}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="p-8 border-0 shadow-lg shadow-slate-200/50 rounded-2xl">
                <h2 className="text-xl font-display font-bold mb-1 text-slate-900">Skills & Languages</h2>
                <p className="text-slate-500 text-sm mb-8">Highlight the skills and languages that make you stand out.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Skills *</Label>
                    <Textarea
                      {...form.register("skills")}
                      className="h-40 bg-slate-50 resize-none"
                      placeholder="List your skills, e.g.:&#10;&#10;Project Management&#10;Data Analysis & Reporting&#10;Stakeholder Engagement&#10;Budget Management&#10;MS Office Suite"
                    />
                    {form.formState.errors.skills && <p className="text-sm text-red-500">{form.formState.errors.skills.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Languages *</Label>
                    <Textarea
                      {...form.register("languages")}
                      className="h-40 bg-slate-50 resize-none"
                      placeholder="List languages and proficiency:&#10;&#10;English — Fluent&#10;French — Professional&#10;Arabic — Intermediate&#10;Swahili — Native"
                    />
                    {form.formState.errors.languages && <p className="text-sm text-red-500">{form.formState.errors.languages.message}</p>}
                  </div>
                </div>

                <div className="mt-8 p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <h4 className="font-semibold text-emerald-800 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Almost done!
                  </h4>
                  <p className="text-sm text-emerald-700">
                    Review your information before saving. A complete profile ensures organizations can effectively evaluate your application.
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="h-12 px-6 rounded-xl"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>

          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentStep ? "w-6 bg-primary" : i < currentStep ? "w-2 bg-primary/40" : "w-2 bg-slate-200"
                }`}
              />
            ))}
          </div>

          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="h-12 px-8 rounded-xl shadow-lg shadow-primary/20"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={upsert.isPending}
              className="h-12 px-10 rounded-xl shadow-lg shadow-primary/30"
            >
              {upsert.isPending ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...</>
              ) : (
                <><Save className="w-4 h-4 mr-2" /> Save Profile</>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
