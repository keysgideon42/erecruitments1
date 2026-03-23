import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
}

const BASE_TITLE = "E-RECRUITMENTS | UN, NGO & INGO Jobs Worldwide";
const BASE_DESCRIPTION =
  "Discover 1,850+ UN, NGO and INGO career opportunities across 190+ countries. Browse international development, humanitarian, and peacekeeping jobs from 120+ top global organizations.";

export function useSEO({ title, description, canonical }: SEOProps) {
  useEffect(() => {
    const fullTitle = title === "Home"
      ? BASE_TITLE
      : `${title} | E-RECRUITMENTS`;

    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement("meta");
        property ? tag.setAttribute("property", name) : tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const desc = description ?? BASE_DESCRIPTION;

    setMeta("description", desc);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", desc, true);
    setMeta("twitter:title", fullTitle, true);
    setMeta("twitter:description", desc, true);

    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    return () => {
      document.title = BASE_TITLE;
    };
  }, [title, description, canonical]);
}
