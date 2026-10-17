import { Badge, Callout } from "@/components/ds";
import { IconClock, IconPermit, IconRupee } from "@/components/icons";
import { DataTable } from "@/components/permits/data-table";
import { PermitGuide, type PermitGuideModel } from "@/components/permits/permit-guide";
import { CheckList, Steps } from "@/components/site/content-blocks";
import { sikkimPermitData as data } from "@/data/permits/sikkim-data";

const q = data.quickStats;
const { throughAgent, atCheckPost } = data.howToGet;

const model: PermitGuideModel = {
  state: data.state,
  slug: data.slug,
  permit: "Protected Area Permit (PAP)",
  shortName: "PAP",
  lastChecked: q.lastUpdated,
  summary:
    "Indians need no permit to enter Sikkim; foreigners need a free entry permit (RAP), issued at Rangpo, Melli or online. Every tourist pays a ₹50 sustainability fee through their hotel. Tsomgo Lake, Nathula and North Sikkim need a protected-area permit, arranged through a registered travel agent in about a day.",
  facts: [
    { label: "General areas", value: "No permit for Indians", icon: IconPermit },
    { label: "Protected areas", value: "PAP via an agent", icon: IconPermit },
    { label: "Fee", value: "₹200 – ₹500", icon: IconRupee },
    { label: "Processing", value: "About 1 day", icon: IconClock },
  ],
  portal: {
    url: q.officialPortal,
    label: "A registered travel agent",
    cta: "Sikkim Tourism website",
    note: "Visitors can't apply for Sikkim protected-area permits themselves — a Sikkim Tourism registered agent files them, usually within a day.",
  },
  helpline: data.contact.helpline,
  custom: [
    {
      id: "zones",
      label: "Permit zones",
      title: "Which areas need a permit",
      intro: "Sikkim is zone-based: the permit depends on where you go, not on entering the state.",
      content: (
        <DataTable
          caption="Sikkim permit zones"
          rowKey={(r) => r.zone}
          rows={data.permitZones}
          columns={[
            { key: "zone", label: "Zone", primary: true, render: (r) => r.zone },
            { key: "places", label: "Places", render: (r) => r.places.join(", ") },
            {
              key: "permit",
              label: "Permit",
              render: (r) => <Badge tone={r.permitRequired ? "caution" : "positive"}>{r.permitRequired ? "Required" : "None"}</Badge>,
            },
            {
              key: "who",
              label: "Foreigners",
              render: (r) => (
                <span>
                  <Badge tone={r.foreignersAllowed ? "positive" : "critical"}>{r.foreignersAllowed ? "Allowed" : "Not allowed"}</Badge>
                  {r.note ? <span className="mt-1.5 block text-small text-fg-muted">{r.note}</span> : null}
                </span>
              ),
            },
          ]}
        />
      ),
    },
    {
      id: "who-can-go",
      label: "Who can go where",
      title: "Who can go where",
      content: (
        <>
          <div className="grid gap-10 md:grid-cols-2">
            <CheckList title="No permit needed" items={data.whoNeeds.noPermitRequired} tone="include" />
            <CheckList title="Permit needed" items={data.whoNeeds.permitRequired} tone="neutral" />
          </div>
          <Callout tone="caution" title="Limits for foreign nationals" className="mt-10">
            <ul className="space-y-1">
              {data.whoNeeds.foreignerRestrictions.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Callout>
        </>
      ),
    },
    {
      id: "how-to-get",
      label: "How to get one",
      title: "How to get a permit",
      intro: "You cannot apply for a Sikkim protected-area permit yourself. It goes through an agent, or your driver at the check post for Tsomgo.",
      content: (
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="font-ui text-h4 text-fg">{throughAgent.title}</h3>
            <Steps className="mt-5" items={throughAgent.steps.map((s) => ({ title: s, body: null }))} />
            <p className="mt-5 font-ui text-small text-fg-muted">Cost: {throughAgent.cost}</p>
          </div>
          <div>
            <h3 className="font-ui text-h4 text-fg">{atCheckPost.title}</h3>
            <Steps className="mt-5" items={atCheckPost.steps.map((s) => ({ title: s, body: null }))} />
            <p className="mt-5 font-ui text-small text-fg-muted">{atCheckPost.note}</p>
          </div>
        </div>
      ),
    },
  ],
  destinations: data.destinations.map((d) => ({
    name: d.name,
    highlight: d.highlight,
    permitRequired: `${d.permitRequired}${d.foreignersAllowed ? "" : " · Indians only"}`,
    bestTime: d.bestTime,
    altitude: d.altitude,
  })),
  tips: data.tips,
  offices: { label: "Tourism office", list: [{ city: "Gangtok", address: data.contact.tourismOffice }] },
  faqs: data.faqs,
  related: data.relatedPages,
};

export default function SikkimPermitPage() {
  return <PermitGuide model={model} />;
}
