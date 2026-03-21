import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useListJobs } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Globe, Users } from "lucide-react";
import { format } from "date-fns";

export function Home() {
  const { data: jobs, isLoading } = useListJobs({ search: "" });
  const recentJobs = jobs?.slice(0, 3) || [];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Global network" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-white"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium tracking-wide">Global Impact Careers</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6 text-balance">
              Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent">UN/NGO</span> Opportunity
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 text-balance leading-relaxed">
              Connect with leading humanitarian organizations, international bodies, and NGOs making a difference worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/jobs">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white border-0 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]">
                  Browse Open Roles <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/organizations">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                  View Organizations
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Briefcase, stat: "1,200+", label: "Active Jobs" },
              { icon: Globe, stat: "150+", label: "Countries" },
              { icon: Users, stat: "300+", label: "Organizations" },
            ].map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex flex-col items-center p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center hover:shadow-xl hover:bg-white transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-primary flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-display font-bold text-slate-900 mb-2">{item.stat}</h3>
                <p className="text-slate-500 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Latest Opportunities</h2>
              <p className="text-slate-500 text-lg">Discover recent postings from top organizations.</p>
            </div>
            <Link href="/jobs" className="hidden md:inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors">
              View All Jobs <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-32 rounded-2xl bg-slate-200 animate-pulse" />
              ))
            ) : recentJobs.length > 0 ? (
              recentJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                        {job.sector}
                      </span>
                      <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                        <Globe className="w-4 h-4" /> {job.location}
                      </span>
                    </div>
                    <Link href={`/jobs/${job.id}`}>
                      <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer mb-2">
                        {job.title}
                      </h3>
                    </Link>
                    <p className="text-slate-600 font-medium">
                      {job.organization?.name || 'Partner Organization'}
                      {job.deadline && ` • Closes ${format(new Date(job.deadline), 'MMM d, yyyy')}`}
                    </p>
                  </div>
                  <Link href={`/jobs/${job.id}`}>
                    <Button variant="outline" className="group-hover:bg-primary group-hover:text-white transition-all h-12 px-6 rounded-xl">
                      Apply Now
                    </Button>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-500">No recent jobs available.</div>
            )}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/jobs">
              <Button variant="ghost" className="text-primary">
                View All Jobs <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
