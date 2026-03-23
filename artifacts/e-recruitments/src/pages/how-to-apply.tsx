import { useSEO } from "@/hooks/use-seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  UserPlus, FileText, Search, Send, MessageSquare, CheckCircle,
  ArrowRight, Star, BookOpen, Users, Clock, Globe, Award, Shield,
  ChevronRight, Lightbulb, Target, TrendingUp,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    color: "bg-blue-500",
    description: "Register on E-Recruitments with your email address. Your account is free and gives you access to thousands of UN and NGO vacancies worldwide.",
    tips: [
      "Use a professional email address",
      "Choose a strong, unique password",
      "Verify your email immediately after registration",
    ],
  },
  {
    number: "02",
    icon: FileText,
    title: "Complete Your Profile",
    color: "bg-violet-500",
    description: "Build a comprehensive profile matching UN and NGO standards. Upload your CV, cover letter templates, academic certificates, and professional references.",
    tips: [
      "Include all relevant work experience with exact dates",
      "List education in reverse chronological order",
      "Upload a professional CV in PDF format",
      "Add language proficiency levels (Basic/Working/Fluent/Native)",
    ],
  },
  {
    number: "03",
    icon: Search,
    title: "Search & Filter Jobs",
    color: "bg-cyan-500",
    description: "Browse our database of live vacancies across 120+ organizations in 90+ countries. Use filters for sector, location, organization type, and contract duration.",
    tips: [
      "Set up job alerts for your preferred sectors and locations",
      "Filter by UN salary grade (G, NO, P levels) to match your experience",
      "Read the full job description before applying",
      "Check the deadline — many UN roles close promptly",
    ],
  },
  {
    number: "04",
    icon: Send,
    title: "Submit Your Application",
    color: "bg-emerald-500",
    description: "Apply directly through E-Recruitments. Your profile data and uploaded documents are automatically attached. Write a targeted cover letter for each role.",
    tips: [
      "Tailor your cover letter to each specific position",
      "Address all listed requirements explicitly",
      "Reference your most relevant achievements with measurable results",
      "Proofread for spelling, grammar, and formatting",
    ],
  },
  {
    number: "05",
    icon: MessageSquare,
    title: "Assessment & Interview",
    color: "bg-amber-500",
    description: "Shortlisted candidates undergo the organization's selection process. This may include a written test, competency-based interview (CBI), and panel interview.",
    tips: [
      "Prepare STAR method answers (Situation, Task, Action, Result)",
      "Review the organization's mandate, country context, and recent reports",
      "For UN roles, review the core competencies listed in the vacancy",
      "Be ready for technical tests in your field of expertise",
    ],
  },
  {
    number: "06",
    icon: CheckCircle,
    title: "Offer & Onboarding",
    color: "bg-rose-500",
    description: "Successful candidates receive a formal offer including salary, benefits, duty station, and contract terms. UN contracts are offered after reference and background checks.",
    tips: [
      "Reference checks are standard — inform your referees in advance",
      "Negotiate start dates professionally if needed",
      "Request a clear briefing on benefits, allowances, and entitlements",
      "Complete all required onboarding documentation promptly",
    ],
  },
];

const UN_GRADES = [
  { grade: "G-Series", title: "General Service", description: "Administrative, clerical, and support roles. Typically locally recruited. G1–G7 with G7 being most senior.", color: "bg-slate-100 border-slate-300" },
  { grade: "NO-Series", title: "National Officer", description: "Professional posts for nationals of the duty station country. NO-A through NO-E.", color: "bg-blue-50 border-blue-200" },
  { grade: "P-Series", title: "International Professional", description: "International professional posts open to all nationalities. P1 (entry) through P5 (senior). Requires advanced degree.", color: "bg-violet-50 border-violet-200" },
  { grade: "D-Series", title: "Director", description: "Senior management posts. D1 and D2. Typically country directors and department heads.", color: "bg-emerald-50 border-emerald-200" },
  { grade: "ASG/USG", title: "Assistant/Under-Secretary-General", description: "The most senior UN appointments. Typically political appointments or very senior career positions.", color: "bg-amber-50 border-amber-200" },
];

const CV_TIPS = [
  { icon: Target, title: "Use UN/NGO CV Format", tip: "Lead with a professional summary, followed by work experience in reverse chronological order. Use exact dates (month and year), full organization names, and include your duty station." },
  { icon: TrendingUp, title: "Quantify Your Achievements", tip: "Replace vague descriptions with measurable outcomes. Instead of 'managed a team', write 'managed a team of 12 staff across 4 field locations, delivering $2.3M programme portfolio'." },
  { icon: BookOpen, title: "Address Competencies", tip: "UN job descriptions list core competencies (Communication, Teamwork, Planning, etc.) and functional competencies. Mirror this language in your CV and cover letter." },
  { icon: Globe, title: "Highlight Field Experience", tip: "Field deployment experience is highly valued. Clearly state all duty stations, especially those in challenging environments. Include security clearance levels if applicable." },
  { icon: Award, title: "List UN Language Proficiency", tip: "UN working languages are Arabic, Chinese, English, French, Russian, and Spanish. Clearly state your proficiency in each: Limited/Working/Fluent/Native." },
  { icon: Shield, title: "Professional References", tip: "Provide at least three professional references, including direct supervisors. References should be people who have directly observed your work in relevant positions." },
];

export function HowToApply() {
  useSEO({
    title: "How to Apply — UN & NGO Hiring Guide",
    description: "Step-by-step guide to applying for UN, NGO and INGO jobs. Learn the 6-step UN hiring process, UN grade system (G, P, D levels), STAR interview method, and CV tips.",
    canonical: "https://erecruitments1.vercel.app/how-to-apply",
  });
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#050d1a] via-[#0a1e3d] to-[#0d2a54]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 text-blue-300" />
              Application Guide & UN Hiring Process
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              How to Apply for UN & NGO Jobs
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A step-by-step guide to navigating the international humanitarian recruitment process — from creating your profile to accepting an offer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">The 6-Step Application Process</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Follow these steps to maximise your chances of success in competitive UN and NGO recruitment processes.</p>
          </div>

          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 md:gap-10"
              >
                {/* Step number & connector */}
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-0.5 flex-1 bg-slate-200 mt-3 mb-0 min-h-[40px]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-slate-400 tracking-widest">STEP {step.number}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-5 text-base">{step.description}</p>

                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Lightbulb className="w-3.5 h-3.5" /> Key Tips
                    </p>
                    <ul className="space-y-2">
                      {step.tips.map((tip, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UN Grading System */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Understanding UN Job Grades</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">The UN uses a standardized grading system to classify positions. Understanding this system helps you apply for roles that match your qualifications and experience.</p>
          </div>

          <div className="grid gap-4">
            {UN_GRADES.map((grade, i) => (
              <motion.div
                key={grade.grade}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-6 rounded-2xl border-2 ${grade.color} flex flex-col md:flex-row md:items-center gap-4`}
              >
                <div className="flex-shrink-0">
                  <span className="inline-block px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl min-w-[80px] text-center">
                    {grade.grade}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">{grade.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{grade.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
            <p className="text-sm text-blue-800 leading-relaxed">
              <strong>Note:</strong> Most international professional positions (P-level) require a master's degree plus 2–7 years of relevant experience depending on the grade. National Officer (NO) positions are open only to nationals of the duty station country. Always read the specific requirements in each vacancy notice.
            </p>
          </div>
        </div>
      </section>

      {/* CV Tips */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">CV & Application Tips</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">International humanitarian organisations have specific expectations. Use these tips to make your application stand out.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CV_TIPS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{item.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competency Interview Guide */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Competency-Based Interview (CBI) Guide</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Most UN agencies and major INGOs use the CBI method. Here's how to prepare effectively.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              { letter: "S", word: "Situation", desc: "Describe the context or situation you were in. Be specific about your role, the organisation, and the time period." },
              { letter: "T", word: "Task", desc: "Explain the task or challenge you were responsible for. What was expected of you?" },
              { letter: "A", word: "Action", desc: "Describe the specific actions YOU took. Use 'I' rather than 'we'. Focus on your individual contribution." },
              { letter: "R", word: "Result", desc: "Share the outcome of your actions. Quantify where possible. What did you achieve or learn?" },
            ].map((item) => (
              <div key={item.letter} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-4 mb-3">
                  <span className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-display font-bold text-xl">
                    {item.letter}
                  </span>
                  <h4 className="text-white font-bold text-lg">{item.word}</h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Common UN Core Competencies to Prepare
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Communication", "Teamwork", "Planning & Organising", "Accountability", "Client Orientation", "Creativity", "Commitment to Continuous Learning", "Technological Awareness", "Managing Performance"].map((comp) => (
                <div key={comp} className="bg-white/10 rounded-xl px-3 py-2 text-sm text-white text-center border border-white/10">
                  {comp}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">Important: Beware of Fraudulent Job Offers</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                The United Nations and legitimate NGOs never ask for payment at any stage of the recruitment process. 
                We will never ask you to pay for visa applications, training fees, or employment processing fees. 
                If you receive such a request, it is a scam. Report suspicious activity to the organisation directly 
                through their official website. E-Recruitments only lists verified vacancies from registered organisations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-slate-500 text-lg mb-10">
            Create your free account, complete your profile, and start applying to thousands of humanitarian and development positions worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
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
        </div>
      </section>
    </div>
  );
}
