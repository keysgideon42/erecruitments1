import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { Link, useLocation } from "wouter";
import { useListJobs, useListOrganizations } from "@workspace/api-client-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Building, Calendar, ArrowRight, Briefcase, Globe } from "lucide-react";
import { OrgAvatar } from "@/components/org-avatar";
import { format } from "date-fns";
import { motion } from "framer-motion";

const SECTOR_COLORS: Record<string, string> = {
  "Health": "bg-red-50 text-red-700",
  "Education": "bg-blue-50 text-blue-700",
  "Protection": "bg-purple-50 text-purple-700",
  "WASH": "bg-cyan-50 text-cyan-700",
  "Nutrition": "bg-orange-50 text-orange-700",
  "Food Security": "bg-green-50 text-green-700",
  "Logistics": "bg-yellow-50 text-yellow-700",
  "Finance": "bg-slate-100 text-slate-700",
  "Camp Management": "bg-amber-50 text-amber-700",
  "Shelter": "bg-lime-50 text-lime-700",
  "Coordination": "bg-indigo-50 text-indigo-700",
  "Communications": "bg-pink-50 text-pink-700",
  "M&E": "bg-teal-50 text-teal-700",
  "HR": "bg-violet-50 text-violet-700",
  "Legal": "bg-rose-50 text-rose-700",
  "IT": "bg-sky-50 text-sky-700",
};

export function Jobs() {
  useSEO({
    title: "Browse International Jobs",
    description: "Search 1,850+ UN, NGO and INGO vacancies across 190+ countries. Filter by sector, organization, and location to find your perfect international development role.",
    canonical: "https://erecruitments1.vercel.app/jobs",
  });
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("all");
  const [orgId, setOrgId] = useState("all");
  const [, navigate] = useLocation();
  const { user } = useAuth();

  const { data: jobs, isLoading } = useListJobs({
    search: search || undefined,
    sector: sector !== "all" ? sector : undefined,
    organization_id: orgId !== "all" ? orgId : undefined,
  });

  const { data: orgs } = useListOrganizations();

  function handleApplyNow(jobId: string) {
    if (user) {
      navigate(`/jobs/${jobId}`);
    } else {
      navigate(`/register?redirect=/jobs/${jobId}`);
    }
  }

  const sectorColor = (s: string) => SECTOR_COLORS[s] || "bg-primary/10 text-primary";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
          <Globe className="w-4 h-4" /> Kenya & East Africa Region
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
          Job Opportunities
        </h1>
        <p className="text-lg text-slate-600">
          Discover your next role in the humanitarian and development sector across{" "}
          <span className="font-semibold text-slate-800">10 UN agencies</span> and{" "}
          <span className="font-semibold text-slate-800">20 leading NGOs</span> in Kenya.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary" />
          <span><strong className="text-slate-900">{jobs?.length ?? "..."}</strong> open positions</span>
        </div>
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-primary" />
          <span><strong className="text-slate-900">{orgs?.length ?? "..."}</strong> organizations</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Kenya-wide placements</span>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-10 shadow-sm border-slate-200 bg-white sticky top-24 z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search job title..."
              className="pl-10 h-12 bg-slate-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger className="h-12 bg-slate-50">
              <SelectValue placeholder="All Sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Protection">Protection</SelectItem>
              <SelectItem value="WASH">WASH</SelectItem>
              <SelectItem value="Nutrition">Nutrition</SelectItem>
              <SelectItem value="Food Security">Food Security</SelectItem>
              <SelectItem value="Logistics">Logistics & Supply Chain</SelectItem>
              <SelectItem value="Finance">Finance & Admin</SelectItem>
              <SelectItem value="Camp Management">Camp Management</SelectItem>
              <SelectItem value="Shelter">Shelter & NFI</SelectItem>
              <SelectItem value="Coordination">Coordination</SelectItem>
              <SelectItem value="Communications">Communications & Media</SelectItem>
              <SelectItem value="M&E">Monitoring & Evaluation</SelectItem>
              <SelectItem value="HR">Human Resources</SelectItem>
              <SelectItem value="Legal">Legal & Compliance</SelectItem>
              <SelectItem value="IT">IT & Technology</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={orgId} onValueChange={setOrgId}>
            <SelectTrigger className="h-12 bg-slate-50">
              <SelectValue placeholder="All Organizations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Organizations</SelectItem>
              {orgs?.map((org) => (
                <SelectItem key={org.id} value={org.id}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="h-12 w-full border-slate-300"
            onClick={() => { setSearch(""); setSector("all"); setOrgId("all"); }}
          >
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Job List */}
      <div className="space-y-5">
        {isLoading ? (
          Array(5).fill(0).map((_, i) => (
            <Card key={i} className="h-40 animate-pulse bg-slate-100 border-0" />
          ))
        ) : jobs?.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No jobs found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your filters or search terms.</p>
            <Button variant="outline" onClick={() => { setSearch(""); setSector("all"); setOrgId("all"); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          jobs?.map((job, index) => (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              key={job.id}
            >
              <Card className="p-6 md:p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group rounded-2xl bg-white border-slate-200">
                <div className="flex flex-col md:flex-row gap-5 justify-between">
                  {/* Left: org logo + info */}
                  <div className="flex gap-5 flex-1 min-w-0">
                    {/* Org logo */}
                    <OrgAvatar
                      name={job.organization?.name || "Partner"}
                      logoUrl={job.organization?.logo_url}
                      size="md"
                    />

                    {/* Job info */}
                    <div className="flex-1 min-w-0 space-y-3">
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full ${sectorColor(job.sector)}`}>
                          {job.sector}
                        </span>
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                          {job.employment_type}
                        </span>
                        {job.organization?.type === "UN" && (
                          <span className="px-2.5 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                            UN Agency
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <Link href={`/jobs/${job.id}`}>
                        <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer leading-tight">
                          {job.title}
                        </h2>
                      </Link>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Building className="w-4 h-4 text-slate-400" />
                          {job.organization?.name || "Partner Organization"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          {job.location}
                        </span>
                        {job.deadline && (
                          <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md font-medium">
                            <Calendar className="w-4 h-4" />
                            Closes {format(new Date(job.deadline), "MMM d, yyyy")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: action buttons */}
                  <div className="flex flex-row md:flex-col gap-3 items-center justify-end md:justify-center flex-shrink-0">
                    <button
                      onClick={() => handleApplyNow(job.id)}
                      className="h-11 px-7 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 whitespace-nowrap"
                    >
                      Apply Now
                    </button>
                    <Link href={`/jobs/${job.id}`}>
                      <button className="h-11 px-5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors whitespace-nowrap flex items-center gap-1.5">
                        Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Sign-up nudge for guests */}
      {!user && (jobs?.length ?? 0) > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-14 bg-gradient-to-r from-primary to-accent rounded-3xl p-10 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
            Ready to Start Your Humanitarian Career?
          </h3>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Create a free account to apply to any of these positions and get notified about new opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="h-13 px-10 bg-white text-primary hover:bg-slate-100 font-bold rounded-xl shadow-xl">
                Create Free Account
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-13 px-10 border-white text-white hover:bg-white/10 rounded-xl">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
