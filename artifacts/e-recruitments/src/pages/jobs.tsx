import { useState } from "react";
import { Link } from "wouter";
import { useListJobs, useListOrganizations } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, MapPin, Building, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export function Jobs() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("all");
  const [orgId, setOrgId] = useState("all");

  const { data: jobs, isLoading } = useListJobs({ 
    search: search || undefined, 
    sector: sector !== "all" ? sector : undefined,
    organization_id: orgId !== "all" ? orgId : undefined
  });
  
  const { data: orgs } = useListOrganizations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">Job Opportunities</h1>
        <p className="text-lg text-slate-600">Discover your next role in the humanitarian and development sector.</p>
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
              {orgs?.map(org => (
                <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button className="h-12 w-full bg-primary text-white hover:bg-primary/90 shadow-md">
            Filter Results
          </Button>
        </div>
      </Card>

      {/* Job List */}
      <div className="space-y-6">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <Card key={i} className="h-40 animate-pulse bg-slate-100 border-0" />
          ))
        ) : jobs?.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No jobs found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
            <Button variant="outline" className="mt-6" onClick={() => { setSearch(""); setSector("all"); setOrgId("all"); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          jobs?.map((job, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={job.id}
            >
              <Card className="p-6 md:p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group rounded-2xl">
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                        {job.employment_type}
                      </span>
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-full">
                        {job.sector}
                      </span>
                    </div>
                    
                    <Link href={`/jobs/${job.id}`}>
                      <h2 className="text-2xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">
                        {job.title}
                      </h2>
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-slate-400" />
                        {job.organization?.name || "Partner Organization"}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {job.location}
                      </div>
                      {job.deadline && (
                        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                          <Calendar className="w-4 h-4" />
                          Closes {format(new Date(job.deadline), "MMM d, yyyy")}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Link href={`/jobs/${job.id}`}>
                    <Button className="w-full md:w-auto h-12 px-8 rounded-xl bg-slate-900 hover:bg-primary text-white transition-colors group-hover:shadow-lg group-hover:shadow-primary/20">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
