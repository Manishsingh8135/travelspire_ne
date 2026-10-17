import { IconCalendar, IconClock, IconPermit, IconRupee } from "@/components/icons";
import { PermitGuide, type PermitGuideModel } from "@/components/permits/permit-guide";
import { nagalandPermitData as data } from "@/data/permits/nagaland-data";

const q = data.quickStats;

const model: PermitGuideModel = {
  state: data.state,
  slug: data.slug,
  permit: "Inner Line Permit (ILP)",
  shortName: "ILP",
  lastChecked: q.lastUpdated,
  summary:
    "Every Indian visitor from outside Nagaland needs an Inner Line Permit — even to drive through. Applications are online only since 31 December 2024. A tourist ILP costs ₹200, lasts 30 days and usually takes one or two working days.",
  facts: [
    { label: "Tourist fee", value: q.fee.tourist30Days, icon: IconRupee },
    { label: "Approval", value: q.processingTime.online, icon: IconClock },
    { label: "Valid for", value: q.validity.tourist, icon: IconCalendar },
    { label: "On arrival", value: "Not available", icon: IconPermit },
  ],
  portal: { url: q.officialPortal, label: "Nagaland ILP portal" },
  helpline: data.contact.officialHelpline,
  email: data.contact.officialEmail,
  whoNeeds: data.whoNeeds,
  steps: data.applicationSteps,
  documents: {
    mandatory: data.documents.mandatory,
    groups: [
      { title: "Students", items: data.documents.forStudents },
      { title: "Business visitors", items: data.documents.forBusiness },
      { title: "Employment", items: data.documents.forEmployment },
    ],
    tips: data.documents.tips,
  },
  fees: [
    { category: "Tourist", fee: q.fee.tourist30Days, validity: q.validity.tourist },
    { category: "Student", fee: q.fee.student5Years, validity: q.validity.student },
    { category: "Trader / partner in business", fee: q.fee.business, validity: q.validity.business },
    { category: "Professional / labourer", fee: q.fee.employment, validity: "1 year / 165 days" },
    { category: "Foreigner", fee: q.fee.foreigner30Days, validity: "30 days" },
  ],
  festival: {
    name: data.hornbillFestival.name,
    dates: data.hornbillFestival.dates,
    venue: data.hornbillFestival.venue,
    description: data.hornbillFestival.description,
    tips: data.hornbillFestival.ilpTips,
    highlights: data.hornbillFestival.highlights,
    link: { label: "Read our Hornbill Festival 2026 guide", href: "/hornbill-festival" },
  },
  entryPoints: data.entryPoints,
  destinations: data.destinations,
  tips: data.tips,
  seasons: data.bestTime,
  offices: { label: "Nagaland House offices", list: data.contact.nagalandHouses },
  faqs: data.faqs,
  related: data.relatedPages,
};

export default function NagalandILPPage() {
  return <PermitGuide model={model} />;
}
