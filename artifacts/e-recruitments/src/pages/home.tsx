import { useSEO } from "@/hooks/use-seo";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useListJobs } from "@workspace/api-client-react";
import { useListOrganizations } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import {
  ArrowRight, Briefcase, Globe, Users, MapPin, Shield,
  BookOpen, ChevronRight, Star, Building2, TrendingUp,
  Award, Clock, CheckCircle, Search, FileText, Send,
} from "lucide-react";
import { format } from "date-fns";

const REGIONS = [
  { name: "Africa", countries: "54 countries", roles: "620+", color: "bg-amber-500", flag: "🌍" },
  { name: "Middle East & North Africa", countries: "22 countries", roles: "280+", color: "bg-orange-500", flag: "🌍" },
  { name: "Asia & Pacific", countries: "48 countries", roles: "340+", color: "bg-blue-500", flag: "🌏" },
  { name: "Europe & Central Asia", countries: "56 countries", roles: "190+", color: "bg-violet-500", flag: "🌍" },
  { name: "Americas", countries: "35 countries", roles: "180+", color: "bg-emerald-500", flag: "🌎" },
  { name: "Global / Remote", countries: "All regions", roles: "240+", color: "bg-cyan-500", flag: "🌐" },
];

const WHY_US = [
  {
    icon: Shield,
    title: "Verified Organisations Only",
    desc: "Every listing comes from a registered UN agency, INGO, or accredited implementing partner. No scams, no fees.",
  },
  {
    icon: Globe,
    title: "True Global Coverage",
    desc: "From Nairobi to New York, Geneva to Kabul — our 1,850+ active roles span every region where international development is happening.",
  },
  {
    icon: TrendingUp,
    title: "UN Hiring Standards",
    desc: "Our platform follows UN recruitment best practices. Jobs are graded (G, NO, P, D levels) and descriptions meet IASC standards.",
  },
  {
    icon: Award,
    title: "Free for Applicants",
    desc: "Creating an account, building your profile, and applying for positions is 100% free. We never charge applicants.",
  },
];

const STEPS = [
  { step: "01", icon: Search, title: "Search & Discover", desc: "Browse 1,850+ live vacancies across 120 organisations. Filter by sector, location, grade level, and contract type." },
  { step: "02", icon: FileText, title: "Build Your Profile", desc: "Create a UN-standard profile with your CV, education history, language proficiency levels, and references." },
  { step: "03", icon: Send, title: "Apply in Minutes", desc: "Submit tailored applications directly through the platform. Your profile data attaches automatically." },
  { step: "04", icon: CheckCircle, title: "Track Your Progress", desc: "Monitor application statuses in real time, from 'Received' through to 'Shortlisted' and 'Offer'." },
];

const UN_AGENCIES_PREVIEW = [
  "UNHCR", "UNICEF", "WFP", "WHO", "IOM", "UNDP", "FAO", "OCHA",
  "UN Women", "UNFPA", "UNESCO", "UNOPS", "UNAIDS", "UNEP", "ILO", "IFAD",
];

export function Home() {
  useSEO({
    title: "Home",
    description: "Discover 1,850+ UN, NGO and INGO career opportunities across 190+ countries. Browse international development, humanitarian, and peacekeeping jobs from 120+ top global organizations.",
    canonical: "https://erecruitments1.vercel.app/",
  });
  const { data: jobs, isLoading: jobsLoading } = useListJobs({ search: "" });
  const { data: orgs } = useListOrganizations();
  const recentJobs = jobs?.slice(0, 6) || [];

  return (
    <div className="w-full">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center pt-24 pb-20 overflow-hidden bg-[#03091a]">
        {/* Animated dot grid */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(100,160,255,0.4) 1.5px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-blue-400/30 backdrop-blur-md mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Globe className="w-3.5 h-3.5 text-blue-300" />
                <span className="text-sm font-medium text-blue-200 tracking-wide">Live International Vacancies</span>
              </div>

              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold font-display leading-[1.08] mb-6 text-white">
                Your Career in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                  Global Impact
                </span>{" "}
                Starts Here
              </h1>

              <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
                The world's leading platform connecting professionals with
                UN agencies, INGOs, and international development organisations
                across 190+ countries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/jobs">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-[0_0_50px_-8px_rgba(37,99,235,0.7)] transition-all hover:shadow-[0_0_60px_-5px_rgba(37,99,235,0.8)]">
                    Browse 1,850+ Open Roles <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/how-to-apply">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-white/5 border-white/15 text-white hover:bg-white/10 backdrop-blur-sm">
                    <BookOpen className="w-4 h-4 mr-2" /> Application Guide
                  </Button>
                </Link>
              </div>

              {/* Trust bar */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Free to apply</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Verified organisations</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> UN-standard listings</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> No recruitment fees</span>
              </div>
            </motion.div>

            {/* Right side: live stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                { icon: Briefcase, value: "1,850+", label: "Active Vacancies", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
                { icon: Building2, value: "120+", label: "Partner Organisations", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
                { icon: Globe, value: "190+", label: "Countries Covered", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
                { icon: Users, value: "50K+", label: "Registered Applicants", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`p-6 rounded-2xl border backdrop-blur-sm ${item.bg}`}
                >
                  <item.icon className={`w-7 h-7 ${item.color} mb-3`} />
                  <div className={`text-3xl font-display font-bold ${item.color} mb-1`}>{item.value}</div>
                  <div className="text-sm text-slate-400 font-medium">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 lg:hidden">
            {[
              { value: "1,850+", label: "Active Jobs" },
              { value: "120+", label: "Organisations" },
              { value: "190+", label: "Countries" },
              { value: "50K+", label: "Applicants" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-300 mb-1">{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UN AGENCY TICKER ──────────────────────────────────────────────── */}
      <section className="py-5 bg-slate-900 border-y border-slate-800 overflow-hidden">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 mb-3">
          <Shield className="w-3.5 h-3.5" /> Partnered Agencies
        </div>
        <div className="flex gap-6 overflow-x-auto scrollbar-none px-6 pb-1 flex-nowrap">
          {UN_AGENCIES_PREVIEW.map((name) => (
            <span
              key={name}
              className="flex-shrink-0 px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300 font-medium whitespace-nowrap"
            >
              {name}
            </span>
          ))}
          <span className="flex-shrink-0 px-4 py-2 bg-blue-900/40 border border-blue-700/40 rounded-full text-sm text-blue-300 font-medium whitespace-nowrap">
            +104 more →
          </span>
        </div>
      </section>

      {/* ── GLOBAL REACH ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-4">
              <MapPin className="w-3.5 h-3.5" /> Global Reach
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Opportunities Across Every Region</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              International development careers span the globe. Our live listings cover every continent and crisis context.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{r.flag}</span>
                  <div className={`w-3 h-3 rounded-full ${r.color}`} />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-1">{r.name}</h3>
                <p className="text-slate-500 text-sm mb-3">{r.countries}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">{r.roles}</span>
                  <span className="text-sm text-slate-400">active roles</span>
                </div>
                <Link href="/jobs">
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    View jobs <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-[#0a1e3d] to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-300 text-sm font-semibold mb-4">
              <Star className="w-3.5 h-3.5" /> Simple & Transparent
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">How E-Recruitments Works</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              From first search to final offer — our platform makes the international hiring process clear and accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all"
              >
                <div className="absolute -top-3 left-6">
                  <span className="text-xs font-bold text-slate-500 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-full">
                    STEP {s.step}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-5 mt-3">
                  <s.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/how-to-apply">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-12 px-8">
                Read the Full Application Guide <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── LATEST JOBS ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-4">
                <Clock className="w-3.5 h-3.5" /> Freshly Posted
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">Latest Opportunities</h2>
              <p className="text-slate-500">Updated weekly from 120+ verified partner organisations.</p>
            </div>
            <Link href="/jobs" className="hidden md:inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors shrink-0">
              View All 1,850+ Jobs <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {jobsLoading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-28 rounded-2xl bg-slate-200 animate-pulse" />
              ))
            ) : recentJobs.length > 0 ? (
              recentJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                        {job.sector}
                      </span>
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate max-w-[220px]">{job.location}</span>
                      </span>
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" /> {job.employment_type}
                      </span>
                    </div>
                    <Link href={`/jobs/${job.id}`}>
                      <h3 className="text-lg md:text-xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer truncate mb-1">
                        {job.title}
                      </h3>
                    </Link>
                    <p className="text-slate-500 text-sm font-medium">
                      {job.organization?.name || "Partner Organisation"}
                      {job.deadline && (
                        <span className="ml-2 text-slate-400">
                          · Closes {format(new Date(job.deadline), "MMM d, yyyy")}
                        </span>
                      )}
                    </p>
                  </div>
                  <Link href={`/jobs/${job.id}`} className="shrink-0">
                    <Button variant="outline" className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all h-10 px-5 rounded-xl text-sm">
                      Apply Now
                    </Button>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16 text-slate-500">No recent jobs available. Check back soon.</div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link href="/jobs">
              <Button size="lg" className="h-12 px-10 rounded-xl shadow-lg shadow-primary/20">
                Browse All 1,850+ Vacancies <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY E-RECRUITMENTS ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-6">
                <Award className="w-3.5 h-3.5" /> Why Choose Us
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
                Built for International <br />Development Professionals
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                E-Recruitments was designed by people who have worked in the humanitarian and development sector.
                We understand the UN hiring process, INGO recruitment timelines, and what organisations actually look for.
              </p>
              <Link href="/how-to-apply">
                <Button className="h-12 px-8 rounded-xl shadow-lg shadow-primary/20">
                  View Application Guide <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {WHY_US.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 text-base">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ORGANISATIONS PREVIEW ─────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-4">
                <Building2 className="w-3.5 h-3.5" /> Partner Organisations
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">120 Verified Organisations</h2>
              <p className="text-slate-500">UN agencies, INGOs, research institutes, and bilateral implementers worldwide.</p>
            </div>
            <Link href="/organizations" className="hidden md:inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors shrink-0">
              View All Organisations <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {(orgs?.slice(0, 12) || Array(12).fill(null)).map((org, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col items-center justify-center text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300 min-h-[90px]"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <Building2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-semibold text-slate-700 leading-tight">
                  {org?.name || `Org ${i + 1}`}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/organizations">
              <Button variant="outline" className="h-11 px-8 rounded-xl border-2">
                View All Organisations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── IMPACT STATS ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Connecting Talent to Where It's Needed Most
            </h2>
            <p className="text-blue-100 text-lg mb-16 max-w-2xl mx-auto">
              Every week, professionals from around the world find meaningful careers through E-Recruitments.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1,850+", label: "Live Vacancies", sub: "Updated weekly" },
              { value: "120", label: "Partner Orgs", sub: "Verified & accredited" },
              { value: "190+", label: "Countries", sub: "Across all regions" },
              { value: "100%", label: "Free to Apply", sub: "No recruitment fees" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{s.value}</div>
                <div className="text-blue-100 font-semibold mb-1">{s.label}</div>
                <div className="text-blue-200 text-sm">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Ready to Make a Global Impact?
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              Join 50,000+ professionals who trust E-Recruitments to find meaningful careers across the UN system,
              leading INGOs, and international development organisations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="h-14 px-10 text-base rounded-xl shadow-lg shadow-primary/20 font-bold">
                  Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="lg" variant="outline" className="h-14 px-10 text-base rounded-xl border-2">
                  Browse Open Jobs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
