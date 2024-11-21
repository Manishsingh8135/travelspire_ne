import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DesignSystem() {
  return (
    <div className="container-lg py-8 space-y-12">
      {/* Colors */}
      <section>
        <h2 className="heading-2 mb-4">Brand Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="w-full h-24 bg-primary rounded-lg" />
            <p className="text-sm font-medium">Primary</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-24 bg-secondary rounded-lg" />
            <p className="text-sm font-medium">Secondary</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-24 bg-accent rounded-lg" />
            <p className="text-sm font-medium">Accent</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-24 bg-muted rounded-lg" />
            <p className="text-sm font-medium">Muted</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="heading-2 mb-4">Typography</h2>
        <div className="space-y-4">
          <div>
            <h1 className="heading-1">Heading 1</h1>
            <p className="text-sm text-muted-foreground">text-4xl/text-5xl, font-extrabold</p>
          </div>
          <div>
            <h2 className="heading-2">Heading 2</h2>
            <p className="text-sm text-muted-foreground">text-3xl, font-semibold</p>
          </div>
          <div>
            <h3 className="heading-3">Heading 3</h3>
            <p className="text-sm text-muted-foreground">text-2xl, font-semibold</p>
          </div>
          <div>
            <h4 className="heading-4">Heading 4</h4>
            <p className="text-sm text-muted-foreground">text-xl, font-semibold</p>
          </div>
          <div>
            <p className="text-lg">Large Text (text-lg)</p>
            <p className="text-base">Base Text (text-base)</p>
            <p className="text-sm">Small Text (text-sm)</p>
            <p className="text-xs">Extra Small Text (text-xs)</p>
          </div>
        </div>
      </section>

      {/* Components */}
      <section>
        <h2 className="heading-2 mb-4">Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="heading-3">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="heading-3">Cards</h3>
            <Card className="p-6">
              <h4 className="heading-4">Card Title</h4>
              <p className="text-muted-foreground">Card content with muted text.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="heading-2 mb-4">Spacing Scale</h2>
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((size) => (
            <div key={size} className="flex flex-col items-center">
              <div className={`w-16 h-${size} bg-primary rounded`} />
              <p className="text-sm mt-2">space-{size}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}