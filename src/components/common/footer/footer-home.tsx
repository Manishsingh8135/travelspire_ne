"use client";

import { Footer } from "@/components/common/footer/footer";
import { footerData } from "@/data/footer/footer-data";

export function FooterHome() {
  return (
    <Footer 
      data={footerData} 
      className="border-primary-100/20 dark:border-white/10" 
    />
  );
}

export default FooterHome;