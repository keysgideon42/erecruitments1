import { Mail, MapPin, Phone, Shield, FileText, AlertTriangle, Globe, Target, Heart, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8 text-center">About Us</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8 text-center">
          E-RECRUITMENTS was founded with a singular mission: to bridge the gap between extraordinary talent and the organizations dedicated to making the world a better place.
        </p>
        <img
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&h=600&fit=crop"
          alt="Humanitarian work"
          className="w-full h-80 object-cover rounded-3xl shadow-lg mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 not-prose">
          {[
            { icon: Target, title: "Our Mission", color: "text-primary bg-primary/10", desc: "To connect passionate professionals with UN agencies, INGOs, and NGOs transforming lives globally." },
            { icon: Globe, title: "Our Vision", color: "text-emerald-600 bg-emerald-50", desc: "A world where the right talent reaches the right humanitarian mission, without barriers." },
            { icon: Heart, title: "Our Values", color: "text-rose-500 bg-rose-50", desc: "Integrity, transparency, and a deep commitment to the humanitarian principles that guide our work." },
          ].map((item) => (
            <Card key={item.title} className="p-6 border-0 shadow-lg shadow-slate-200/50 rounded-2xl">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold font-display text-slate-900 mt-12 mb-4">What We Do</h2>
        <p>
          Our platform centralizes specialized opportunities across sectors — from emergency response and healthcare to policy-making and sustainable development. We provide a streamlined, secure, and professional environment for applicants to build comprehensive profiles and apply directly to vetted organizations.
        </p>
        <p>
          We work with UN agencies, international NGOs, local humanitarian organizations, and government bodies to bring the most relevant career opportunities to professionals who are passionate about global impact. Every listing on our platform is verified to ensure it meets our standards for authenticity and fairness.
        </p>

        <h2 className="text-2xl font-bold font-display text-slate-900 mt-12 mb-4">Who We Serve</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-4">
          {[
            { title: "Job Seekers", desc: "Professionals with experience in humanitarian, development, and NGO sectors looking for meaningful career advancement." },
            { title: "Organizations", desc: "UN agencies, INGOs, and NGOs seeking pre-screened, qualified candidates for specialized roles worldwide." },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-slate-900">{item.title}</h4>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold font-display text-slate-900 mt-12 mb-4">Our Reach</h2>
        <p>
          E-RECRUITMENTS operates globally, with a focus on regions where humanitarian and development work is most active. Our network spans over 150 countries and connects candidates with organizations operating in conflict zones, post-disaster environments, and long-term development settings.
        </p>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 text-center">Contact Us</h1>
      <p className="text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
        Have questions about an application or want to partner your organization with us? We're here to help.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="p-8 text-center flex flex-col items-center shadow-lg shadow-slate-200/50 border-0 rounded-3xl">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg mb-2">Email</h3>
          <a href="mailto:info@erecruitments.org" className="text-primary hover:underline font-medium">info@erecruitments.org</a>
          <p className="text-slate-500 text-sm mt-2">We respond within 24 hours</p>
        </Card>
        <Card className="p-8 text-center flex flex-col items-center shadow-lg shadow-slate-200/50 border-0 rounded-3xl bg-primary text-white">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white mb-6">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg mb-2">Headquarters</h3>
          <p className="text-blue-100">Geneva, Switzerland</p>
          <p className="text-blue-200 text-sm mt-1">Global Operations Hub</p>
        </Card>
        <Card className="p-8 text-center flex flex-col items-center shadow-lg shadow-slate-200/50 border-0 rounded-3xl">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
            <Phone className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg mb-2">Support</h3>
          <p className="text-slate-600">+41 22 000 00 00</p>
          <p className="text-slate-500 text-sm mt-1">Mon–Fri, 9am–5pm CET</p>
        </Card>
      </div>

      <Card className="p-8 border-0 shadow-lg shadow-slate-200/50 rounded-3xl">
        <h2 className="text-2xl font-bold font-display text-slate-900 mb-2">Frequently Asked Questions</h2>
        <p className="text-slate-500 mb-8">Quick answers to common questions.</p>
        <div className="space-y-6">
          {[
            {
              q: "How do I apply for a job?",
              a: "Create an account, complete your profile, then browse our job listings and click 'Apply Now' on any position you're interested in."
            },
            {
              q: "Is E-RECRUITMENTS free to use?",
              a: "Yes, the platform is completely free for job seekers. Organizations may have partnership fees — contact us for details."
            },
            {
              q: "How will I know if my application status changes?",
              a: "You will receive an automated email notification whenever an organization updates your application status. You can also track it in your dashboard."
            },
            {
              q: "How do I list my organization's vacancies?",
              a: "Please reach out to us at info@erecruitments.org to discuss our organizational partnership options."
            },
          ].map((item, i) => (
            <div key={i} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
              <h4 className="font-semibold text-slate-900 mb-2">{item.q}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 text-lg leading-relaxed">
          At E-RECRUITMENTS, we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our platform.
        </p>

        <h3>1. Information We Collect</h3>
        <p>We collect information you provide directly, including:</p>
        <ul>
          <li><strong>Account data:</strong> Email address and password used for authentication.</li>
          <li><strong>Profile data:</strong> Full name, phone number, nationality, date of birth, address, professional summary, education history, work experience, skills, and languages.</li>
          <li><strong>Documents:</strong> CVs, cover letters, certificates, and other files you upload to your profile.</li>
          <li><strong>Application data:</strong> Job applications including cover letters and submission timestamps.</li>
          <li><strong>Usage data:</strong> Non-identifiable information about how you interact with the platform (page visits, session duration).</li>
        </ul>

        <h3>2. How We Use Your Information</h3>
        <p>We use your data exclusively to:</p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Facilitate job applications to verified organizations on our platform.</li>
          <li>Send transactional emails (application confirmation, status updates).</li>
          <li>Improve platform functionality and user experience.</li>
          <li>Comply with legal obligations.</li>
        </ul>
        <p>We do <strong>not</strong> sell, rent, or share your personal data with third parties for marketing purposes.</p>

        <h3>3. Data Sharing</h3>
        <p>Your profile and application information are shared with the specific organizations you apply to. By submitting an application, you consent to the relevant organization accessing your profile details and uploaded documents for the purpose of evaluating your candidacy.</p>

        <h3>4. Data Security</h3>
        <p>We implement strict security measures including:</p>
        <ul>
          <li>End-to-end HTTPS encryption for all data transmission.</li>
          <li>Secure cloud storage provided by enterprise-grade providers (Supabase).</li>
          <li>Role-based access controls to limit data access.</li>
          <li>Regular security audits and vulnerability assessments.</li>
        </ul>

        <h3>5. Data Retention</h3>
        <p>We retain your data for as long as your account is active. You may request deletion of your account and associated data at any time by contacting us at <a href="mailto:info@erecruitments.org">info@erecruitments.org</a>.</p>

        <h3>6. Your Rights (GDPR)</h3>
        <p>If you are located in the European Economic Area, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request deletion of your data.</li>
          <li>Object to or restrict the processing of your data.</li>
          <li>Data portability — receive your data in a structured, machine-readable format.</li>
        </ul>
        <p>To exercise any of these rights, contact us at <a href="mailto:info@erecruitments.org">info@erecruitments.org</a>.</p>

        <h3>7. Cookies</h3>
        <p>We use essential session cookies to maintain your login state. We do not use tracking or advertising cookies.</p>

        <h3>8. Changes to this Policy</h3>
        <p>We may update this policy periodically. Significant changes will be communicated via email. Continued use of the platform constitutes acceptance of the updated policy.</p>

        <h3>9. Contact</h3>
        <p>For privacy-related inquiries: <a href="mailto:info@erecruitments.org">info@erecruitments.org</a></p>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Terms & Conditions</h1>
          <p className="text-slate-500 text-sm">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 text-lg leading-relaxed">
          By accessing or using E-RECRUITMENTS, you agree to be bound by the following Terms and Conditions. Please read them carefully before using our platform.
        </p>

        <h3>1. Acceptance of Terms</h3>
        <p>By creating an account or using E-RECRUITMENTS in any capacity, you confirm that you have read, understood, and agree to these Terms. If you do not agree, please discontinue use immediately.</p>

        <h3>2. Eligibility</h3>
        <p>You must be at least 18 years old and legally permitted to work in your jurisdiction to use this platform. By registering, you represent that you meet these criteria.</p>

        <h3>3. User Accounts</h3>
        <p>You are responsible for:</p>
        <ul>
          <li>Maintaining the confidentiality of your account credentials.</li>
          <li>All activities conducted under your account.</li>
          <li>Notifying us immediately of any unauthorized access at <a href="mailto:info@erecruitments.org">info@erecruitments.org</a>.</li>
        </ul>
        <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>

        <h3>4. User Responsibilities</h3>
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate, current, and complete information in your profile and applications.</li>
          <li>Not impersonate any person or entity.</li>
          <li>Not upload false, fraudulent, or misleading credentials or documents.</li>
          <li>Not use the platform for any unlawful purpose.</li>
          <li>Not attempt to access administrative areas or other users' data.</li>
        </ul>
        <p>Misrepresentation or fraudulent activity will result in immediate account termination and may be reported to relevant authorities.</p>

        <h3>5. Application Submissions</h3>
        <p>By submitting a job application, you:</p>
        <ul>
          <li>Authorize E-RECRUITMENTS to share your profile and uploaded documents with the relevant hiring organization.</li>
          <li>Acknowledge that E-RECRUITMENTS does not guarantee employment outcomes.</li>
          <li>Understand that hiring decisions rest solely with the respective organizations.</li>
        </ul>

        <h3>6. Intellectual Property</h3>
        <p>All platform content, branding, and design elements are the property of E-RECRUITMENTS. You may not reproduce, distribute, or create derivative works without our explicit written consent.</p>

        <h3>7. Limitation of Liability</h3>
        <p>E-RECRUITMENTS is not liable for any indirect, incidental, or consequential damages arising from your use of the platform, including but not limited to loss of employment opportunities or data breaches caused by factors outside our control.</p>

        <h3>8. Third-Party Links</h3>
        <p>Our platform may contain links to external websites. We are not responsible for the content or practices of these sites.</p>

        <h3>9. Modifications</h3>
        <p>We reserve the right to modify these Terms at any time. Continued use of the platform after changes constitutes your acceptance of the revised Terms.</p>

        <h3>10. Governing Law</h3>
        <p>These Terms are governed by the laws of Switzerland. Disputes shall be resolved in the courts of Geneva.</p>

        <h3>11. Contact</h3>
        <p>Legal inquiries: <a href="mailto:info@erecruitments.org">info@erecruitments.org</a></p>
      </div>
    </div>
  );
}

export function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Disclaimer</h1>
          <p className="text-slate-500 text-sm">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h3>Platform Role</h3>
        <p>
          E-RECRUITMENTS operates as an intermediary platform connecting job seekers with humanitarian and development organizations. We do not act as an employer or employment agency.
        </p>

        <h3>No Employment Guarantee</h3>
        <p>
          Listing or applying for a position on E-RECRUITMENTS does not guarantee employment. All hiring decisions, including offer issuance, background checks, and final selection, are made exclusively by the recruiting organizations. E-RECRUITMENTS has no influence over these decisions.
        </p>

        <h3>Accuracy of Job Listings</h3>
        <p>
          While we make every effort to verify the legitimacy of organizations and job postings on our platform, E-RECRUITMENTS does not warrant the accuracy, completeness, or currency of any listing. Users are encouraged to verify details directly with the hiring organization before making career decisions.
        </p>

        <h3>No Fees</h3>
        <p>
          Legitimate UN agencies, INGOs, and NGOs do <strong>never</strong> charge application fees. If any organization listed on our platform requests payment from candidates, please report it immediately to <a href="mailto:info@erecruitments.org">info@erecruitments.org</a>. E-RECRUITMENTS is not responsible for fraudulent activity by third parties.
        </p>

        <h3>Third-Party Organizations</h3>
        <p>
          E-RECRUITMENTS is not affiliated with, endorsed by, or a subsidiary of the United Nations, any UN agency, or any specific INGO listed on the platform. Organization names and logos are used for identification purposes only and remain the property of their respective owners.
        </p>

        <h3>External Links</h3>
        <p>
          Links to external websites (e.g., organization websites) are provided for convenience. E-RECRUITMENTS does not control these sites and is not responsible for their content, availability, or privacy practices.
        </p>

        <h3>Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by applicable law, E-RECRUITMENTS disclaims all liability for any loss, injury, or damage arising from reliance on information provided on this platform or from the actions of recruiting organizations.
        </p>

        <h3>Report Concerns</h3>
        <p>
          If you encounter a fraudulent listing, suspicious organization, or any other concern, please contact us at <a href="mailto:info@erecruitments.org">info@erecruitments.org</a>. We take all reports seriously and will investigate promptly.
        </p>
      </div>
    </div>
  );
}
