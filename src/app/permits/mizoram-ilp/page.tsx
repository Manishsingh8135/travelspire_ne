import { IconCalendar, IconClock, IconPlane, IconRupee } from "@/components/icons";
import { PermitGuide, type PermitGuideModel } from "@/components/permits/permit-guide";
import { mizoramPermitData as data } from "@/data/permits/mizoram-data";

const q = data.quickStats;

const model: PermitGuideModel = {
  state: data.state,
  slug: data.slug,
  permit: "Inner Line Permit (ILP)",
  shortName: "ILP",
  lastChecked: q.lastUpdated,
  summary:
    "Indian visitors from outside Mizoram need an Inner Line Permit. It costs about ₹300–350, lasts 7 days for tourists, is approved after a document check, and is the one ILP in the Northeast you can also get on arrival — at Lengpui Airport.",
  facts: [
    { label: "Fee", value: q.fee.total, icon: IconRupee },
    { label: "Online approval", value: q.processingTime.online, icon: IconClock },
    { label: "Valid for", value: q.validity.temporary, icon: IconCalendar },
    { label: "On arrival", value: "Yes, at Lengpui", icon: IconPlane },
  ],
  portal: { url: q.officialPortal, label: "Mizoram ILP portal" },
  helpline: q.helpline,
  whoNeeds: data.whoNeeds,
  steps: data.applicationSteps,
  documents: { mandatory: data.documents.mandatory, tips: data.documents.tips },
  fees: [
    { category: "Temporary ILP, total", fee: q.fee.total, validity: q.validity.temporary },
    { category: "Regular ILP (workers)", fee: "As listed on the portal", validity: q.validity.regular },
  ],
  entryPoints: data.entryPoints,
  destinations: data.destinations,
  tips: data.tips,
  seasons: data.bestTime,
  offices: { label: "Mizoram House liaison offices", list: data.contact.liaisonOffices },
  faqs: data.faqs,
  related: data.relatedPages,
};

export default function MizoramILPPage() {
  return <PermitGuide model={model} />;
}
