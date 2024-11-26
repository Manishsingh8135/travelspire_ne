// types/faq.ts
export interface FAQItem {
    question: string;
    answer: string;
    category?: string;
    id: string;
  }
  
  export interface FAQSection {
    title: string;
    description: string;
    faqs: FAQItem[];
  }
  