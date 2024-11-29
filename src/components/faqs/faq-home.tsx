import { AdvancedFAQ } from "./faq-base";
import { faqData } from "@/data/faqs/faq-data";

export default function FAQSection() {
  return <AdvancedFAQ section={faqData} />;
}