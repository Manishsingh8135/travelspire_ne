import { IconCalendar, IconClock, IconPermit, IconRupee } from "@/components/icons";
import { PermitGuide, type PermitGuideModel } from "@/components/permits/permit-guide";
import { arunachalPermitData as data } from "@/data/permits/arunachal-data";

const model: PermitGuideModel = {
  state: data.state,
  slug: data.slug,
  permit: "Inner Line Permit (ILP)",
  shortName: "ILP",
  lastChecked: data.quickStats.lastUpdated,
  summary:
    "Every Indian visitor from outside Arunachal needs an Inner Line Permit, applied for online before you travel. The tourist eILP costs ₹300 for up to three days or ₹500 for up to fourteen, and is usually approved within a day.",
  facts: [
    { label: "Fee", value: "₹300 – ₹500", icon: IconRupee },
    { label: "Approval", value: data.quickStats.processingTime.online, icon: IconClock },
    { label: "Valid for", value: "Up to 14 days", icon: IconCalendar },
    { label: "On arrival", value: "Not available", icon: IconPermit },
  ],
  portal: { url: data.quickStats.officialPortal, label: "Arunachal eILP portal" },
  helpline: data.contact.officialHelpline,
  email: data.contact.officialEmail,
  whoNeeds: data.whoNeeds,
  steps: data.applicationSteps,
  documents: {
    mandatory: data.documents.mandatory,
    groups: [
      { title: "Travelling with children", items: data.documents.forMinors },
      { title: "Applying as a group", items: data.documents.forGroups },
    ],
    tips: data.documents.tips,
  },
  fees: [
    { category: "Tourist eILP, up to 3 days", fee: data.quickStats.fee.touristUpTo3Days, validity: "The dates you apply for" },
    { category: "Tourist eILP, 4 to 14 days", fee: data.quickStats.fee.tourist4To14Days, validity: data.quickStats.validity.tourist },
    { category: "Provisional eILP", fee: "As listed on the portal", validity: data.quickStats.validity.provisional },
    { category: "Regular ILP (work, study)", fee: "As listed on the portal", validity: data.quickStats.validity.regular },
  ],
  border: data.specialPermits,
  entryPoints: data.entryPoints,
  destinations: data.destinations,
  tips: data.tips,
  seasons: data.bestTime,
  offices: { label: "Arunachal Bhawan offices", list: data.contact.arunachalBhawans },
  faqs: data.faqs,
  related: data.relatedPages,
};

export default function ArunachalILPPage() {
  return <PermitGuide model={model} />;
}
