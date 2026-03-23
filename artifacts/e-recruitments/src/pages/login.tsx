import { useState } from "react";
import { useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function Login() {
  useSEO({
    title: "Sign In — Apply for UN & NGO Jobs",
    description: "Sign in or create an account on E-RECRUITMENTS to apply for UN, NGO and INGO jobs worldwide.",
    canonical: "https://erecruitments1.vercel.app/login",
  });
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (action: 'signin' | 'signup') => {
    if (!email || !password) {
      toast({ title: "Error", description: "Please enter email and password", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = action === 'signin' 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (error) throw error;

      if (action === 'signup') {
        toast({ title: "Success", description: "Account created! You are now logged in." });
      } else {
        toast({ title: "Welcome back", description: "Successfully signed in." });
      }
      setLocation("/dashboard");
    } catch (err: any) {
      toast({ title: "Authentication Failed", description: err.message || "An error occurred", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
          <div className="bg-primary p-8 text-center">
            <img src={`${import.meta.env.BASE_URL}images/logo-icon.png`} alt="Logo" className="w-16 h-16 mx-auto mb-4 drop-shadow-md brightness-0 invert" />
            <CardTitle className="text-3xl font-display text-white mb-2">Welcome</CardTitle>
            <CardDescription className="text-blue-100 text-base">Sign in or create an account to apply for opportunities</CardDescription>
          </div>
          
          <CardContent className="p-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-slate-100 p-1 rounded-xl">
                <TabsTrigger value="signin" className="rounded-lg text-base data-[state=active]:bg-white data-[state=active]:shadow-sm">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-lg text-base data-[state=active]:bg-white data-[state=active]:shadow-sm">Sign Up</TabsTrigger>
              </TabsList>
              
              {['signin', 'signup'].map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor={`${tab}-email`} className="text-slate-600">Email Address</Label>
                    <Input 
                      id={`${tab}-email`} 
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${tab}-password`} className="text-slate-600">Password</Label>
                    <Input 
                      id={`${tab}-password`} 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-primary/20"
                    />
                  </div>
                  <Button 
                    className="w-full h-12 text-lg rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
                    onClick={() => handleAuth(tab as any)}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (tab === 'signin' ? 'Sign In' : 'Create Account')}
                  </Button>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
