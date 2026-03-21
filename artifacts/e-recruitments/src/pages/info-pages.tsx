import { Mail, MapPin, Phone } from "lucide-react";
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
        <h2 className="text-2xl font-bold font-display text-slate-900 mt-12 mb-4">Our Vision</h2>
        <p>
          We envision a seamless global network where UN agencies, INGOs, and local humanitarian bodies can instantly connect with the precise skills and passionate individuals they need to execute critical missions.
        </p>
        <h2 className="text-2xl font-bold font-display text-slate-900 mt-12 mb-4">What We Do</h2>
        <p>
          Our platform centralizes specialized opportunities across sectors—from emergency response and healthcare to policy making and sustainable development. We provide a streamlined, secure, and professional environment for applicants to build comprehensive profiles and apply directly to vetted organizations.
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
        </Card>
        <Card className="p-8 text-center flex flex-col items-center shadow-lg shadow-slate-200/50 border-0 rounded-3xl bg-primary text-white">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white mb-6">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg mb-2">Headquarters</h3>
          <p className="text-blue-100">Geneva, Switzerland<br/>Global Hub</p>
        </Card>
        <Card className="p-8 text-center flex flex-col items-center shadow-lg shadow-slate-200/50 border-0 rounded-3xl">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6">
            <Phone className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg mb-2">Support Phone</h3>
          <p className="text-slate-600">+41 22 000 00 00<br/>Mon-Fri, 9am-5pm CET</p>
        </Card>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-slate">
      <h1 className="font-display">Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <h3>1. Information We Collect</h3>
      <p>We collect information you provide directly to us, including your name, email, professional history, and uploaded documents like CVs.</p>
      <h3>2. How We Use Your Information</h3>
      <p>Your data is exclusively used to facilitate job applications to verified organizations on our platform.</p>
      <h3>3. Data Security</h3>
      <p>We implement strict security protocols and use enterprise-grade cloud providers to protect your sensitive documents.</p>
    </div>
  );
}

export function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-slate">
      <h1 className="font-display">Terms & Conditions</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <h3>1. Acceptance of Terms</h3>
      <p>By accessing E-RECRUITMENTS, you agree to abide by these Terms and Conditions.</p>
      <h3>2. User Responsibilities</h3>
      <p>You must provide accurate and truthful information in your profile and applications. Misrepresentation may result in account termination.</p>
    </div>
  );
}

export function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-slate">
      <h1 className="font-display">Disclaimer</h1>
      <p>E-RECRUITMENTS acts as a bridge between candidates and organizations. We do not guarantee employment, nor are we responsible for the hiring decisions made by third-party organizations listed on this platform.</p>
    </div>
  );
}
