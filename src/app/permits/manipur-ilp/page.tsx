import { IconCalendar, IconClock, IconPermit, IconRupee } from "@/components/icons";
import { PermitGuide, type PermitGuideModel } from "@/components/permits/permit-guide";
import { manipurPermitData as data } from "@/data/permits/manipur-data";

const q = data.quickStats;

const model: PermitGuideModel = {
  state: data.state,
  slug: data.slug,
  permit: "Inner Line Permit (ILP)",
  shortName: "ILP",
  lastChecked: q.lastUpdated,
  summary:
    "Since December 2019 every non-indigenous Indian visitor to Manipur needs an Inner Line Permit, applied for online before you travel. A temporary ILP costs ₹100, lasts 30 days and takes one or two working days.",
  facts: [
    { label: "Temporary fee", value: q.fee.temporary30Days, icon: IconRupee },
    { label: "Approval", value: q.processingTime.online, icon: IconClock },
    { label: "Valid for", value: q.validity.temporary, icon: IconCalendar },
    { label: "On arrival", value: "Not available", icon: IconPermit },
  ],
  portal: { url: q.officialPortal, label: "Manipur ILP portal" },
  helpline: q.helpline,
  whoNeeds: data.whoNeeds,
  steps: data.applicationSteps,
  documents: { mandatory: data.documents.mandatory, tips: data.documents.tips },
  fees: [
    { category: "Temporary", fee: q.fee.temporary30Days, validity: q.validity.temporary },
    { category: "Regular", fee: q.fee.regular3Months, validity: q.validity.regular },
    { category: "Special", fee: q.fee.special3Years, validity: q.validity.special },
  ],
  festival: {
    name: data.sangaiFestival.name,
    dates: data.sangaiFestival.dates,
    venue: data.sangaiFestival.venue,
    description: data.sangaiFestival.description,
    tips: [
      "Apply at least a week before the festival — processing takes 1–2 working days and demand rises in November",
      "The standard temporary ILP covers Imphal, Loktak Lake and Keibul Lamjao — no extra permit",
      "Book stays early; Imphal fills up for the festival",
    ],
  },
  entryPoints: data.entryPoints,
  destinations: data.destinations,
  tips: data.tips,
  faqs: data.faqs,
  related: data.relatedPages,
};

export default function ManipurILPPage() {
  return <PermitGuide model={model} />;
}
