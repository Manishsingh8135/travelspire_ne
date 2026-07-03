// Primitive UI kit — built once, reused everywhere.
// See docs-new/03-frontend/04-component-library.md
export { Button, buttonVariants, type ButtonProps } from "./button";
export { Badge, badgeVariants, type BadgeProps } from "./badge";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
export { Field, Label, FieldDescription, FieldMessage } from "./field";
export { Input } from "./input";
export { Textarea } from "./textarea";
export { SearchBar, type SearchBarProps } from "./search-bar";
export { Eyebrow, eyebrowVariants } from "./eyebrow";
export { GlassPanel, glassPanelVariants } from "./glass-panel";
export { StatBlock } from "./stat-block";
export { StampBadge } from "./stamp-badge";
// NOTE: `Photo` is intentionally NOT re-exported here — it pulls in the
// `server-only` blur map (image-blur.ts), which would break any client component
// that imports this barrel. Import it directly: `@/components/ui/photo`.
