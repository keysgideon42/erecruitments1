import { useListOrganizations } from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Globe, ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { OrgAvatar } from "@/components/org-avatar";

export function Organizations() {
  const { data: orgs, isLoading } = useListOrganizations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Partner Organizations</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          We collaborate with the world's leading UN agencies, INGOs, and humanitarian institutions to connect them with exceptional talent.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orgs?.map((org, i) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col p-8 border-slate-200 hover:shadow-xl transition-all duration-300 rounded-3xl bg-white group">
                <div className="mb-6 group-hover:scale-110 transition-transform self-start">
                  <OrgAvatar name={org.name} logoUrl={org.logo_url} size="lg" />
                </div>

                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full self-start mb-4 ${
                  org.type === "UN" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                }`}>
                  {org.type === "UN" ? "UN Agency" : "NGO"}
                </span>
                
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">{org.name}</h3>
                
                <p className="text-slate-600 flex-1 mb-6 leading-relaxed">
                  {org.description || "A dedicated partner organization working towards global humanitarian and development goals."}
                </p>
                
                {org.website && (
                  <Button variant="ghost" className="self-start -ml-4 text-primary hover:text-primary hover:bg-primary/5" asChild>
                    <a href={org.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" /> Visit Website <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                    </a>
                  </Button>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
