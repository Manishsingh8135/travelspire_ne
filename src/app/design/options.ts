import { Inter, Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import palettes from "./palettes.json";

/* Design-direction options for the founder to compare on /design. Evergreen
   is the shipped default (tokens in globals.css); the others override the
   same tokens and font variables on the specimen wrapper only. These fonts
   load on /design alone. */

const inter = Inter({ subsets: ["latin"], variable: "--font-opt-inter", display: "swap" });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-opt-newsreader",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-opt-jakarta", display: "swap" });

export const optionFontVariables = [inter.variable, newsreader.variable, jakarta.variable].join(" ");

export const options = [
  {
    id: "evergreen",
    name: "Evergreen",
    note: "Crisp white, cool greys, evergreen action colour. Instrument Sans with a serif-italic accent.",
  },
  {
    id: "glacier",
    name: "Glacier",
    note: "Cool slate neutrals, alpine-lake blue. Geist throughout, no serif — the cleanest, most product-like.",
  },
  {
    id: "ink",
    name: "Ink",
    note: "Pure black and white, colour only for status. Newsreader serif headings over Inter — quiet luxury.",
  },
  {
    id: "summit",
    name: "Summit",
    note: "Cool slate neutrals with the logo’s orange as the action colour. Plus Jakarta Sans, serif-italic accent.",
  },
] as const;

export type OptionId = (typeof options)[number]["id"];

export function isOptionId(value: string | undefined): value is OptionId {
  return options.some((o) => o.id === value);
}

const hexToChannels = (hex: string) =>
  [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(" ");

const tokenBlock = (tokens: Record<string, string>) =>
  Object.entries(tokens)
    .map(([name, hex]) => `--c-${name}: ${hexToChannels(hex)};`)
    .join(" ");

/* Typography differences per option, applied through the ds-heading and
   ds-accent hooks so the components themselves stay option-agnostic. */
const typeRules: Record<Exclude<OptionId, "evergreen">, string> = {
  glacier: `
    [data-palette="glacier"] { --font-ui: var(--font-geist-sans); }
    [data-palette="glacier"] .ds-heading { letter-spacing: -0.03em; }
    [data-palette="glacier"] .ds-accent { font-family: var(--font-geist-sans); font-style: normal; font-size: 1em; font-weight: 600; letter-spacing: inherit; }
  `,
  ink: `
    [data-palette="ink"] { --font-ui: var(--font-opt-inter); --font-display: var(--font-opt-newsreader); }
    [data-palette="ink"] .ds-heading { font-family: var(--font-opt-newsreader); font-weight: 500; letter-spacing: -0.015em; }
    [data-palette="ink"] .ds-accent { font-size: 1em; font-weight: 400; }
  `,
  summit: `
    [data-palette="summit"] { --font-ui: var(--font-opt-jakarta); }
    [data-palette="summit"] .ds-heading { font-weight: 700; letter-spacing: -0.025em; }
  `,
};

/* Light rules use [data-palette][data-theme] so they outrank the default
   :root / [data-theme="light"] tokens; dark rules come after with the same
   specificity, so they win in dark mode. */
export const optionsCss = (Object.keys(typeRules) as Array<keyof typeof typeRules>)
  .map((id) => {
    const p = palettes[id];
    return `
      [data-palette="${id}"][data-theme] { ${tokenBlock(p.light)} }
      [data-palette="${id}"][data-theme="dark"] { ${tokenBlock(p.dark)} }
      ${typeRules[id]}
    `;
  })
  .join("\n");
