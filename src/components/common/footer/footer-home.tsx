"use client";

import { Footer } from "@/components/common/footer/footer";
import { footerData } from "@/data/footer/footer-data";

export function FooterHome() {
  return (
    <Footer 
      data={footerData} 
      className="mt-20 md:mt-32 border-t border-primary-100/20 dark:border-white/10" 
    />
  );
}

export default FooterHome;