// src/app/design/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function DesignShowcase() {
  return (
    <div className="min-h-screen bg-background p-8">
      {/* Page Title */}
      <div className="container mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="heading-1 text-gradient-primary mb-4">
            Design System
          </h1>
          <p className="text-xl text-muted-foreground">
            A showcase of our design system components and styles.
          </p>
        </motion.div>
      </div>

      {/* Colors Section */}
      <section className="container mx-auto mb-16">
        <h2 className="heading-2 mb-8">Colors & Gradients</h2>
        
        {/* Primary Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Primary Colors</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => (
                <div
                  key={weight}
                  className={`w-16 h-16 rounded-lg bg-primary-${weight} flex items-center justify-center text-xs`}
                  style={{ color: weight > 500 ? 'white' : 'black' }}
                >
                  {weight}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Gradients */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Gradients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-16 rounded-lg gradient-primary" />
              <div className="h-16 rounded-lg gradient-secondary" />
              <div className="h-16 rounded-lg gradient-accent" />
              <div className="h-16 rounded-lg gradient-diagonal" />
            </CardContent>
          </Card>

          {/* Shadows and Effects */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Shadows & Effects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-16 rounded-lg bg-white shadow-glow-sm" />
              <div className="h-16 rounded-lg bg-white shadow-glow" />
              <div className="h-16 rounded-lg bg-white shadow-glow-lg" />
              <div className="h-16 rounded-lg bg-white shadow-glow-xl" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Typography Section */}
      <section className="container mx-auto mb-16">
        <h2 className="heading-2 mb-8">Typography</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Headings */}
          <Card>
            <CardHeader>
              <CardTitle>Headings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h1 className="heading-1">Heading 1</h1>
              <h2 className="heading-2">Heading 2</h2>
              <h3 className="heading-3">Heading 3</h3>
              <h4 className="heading-4">Heading 4</h4>
            </CardContent>
          </Card>

          {/* Text Styles */}
          <Card>
            <CardHeader>
              <CardTitle>Text Styles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-6xl">6XL Text</p>
              <p className="text-5xl">5XL Text</p>
              <p className="text-4xl">4XL Text</p>
              <p className="text-3xl">3XL Text</p>
              <p className="text-2xl">2XL Text</p>
              <p className="text-xl">XL Text</p>
              <p className="text-lg">Large Text</p>
              <p className="text-base">Base Text</p>
              <p className="text-sm">Small Text</p>
              <p className="text-xs">XS Text</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Components Section */}
      <section className="container mx-auto mb-16">
        <h2 className="heading-2 mb-8">Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Various button styles and states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">Large</Button>
                <Button>Default</Button>
                <Button size="sm">Small</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient">Gradient</Button>
                <Button className="btn-outline-gradient">Outline Gradient</Button>
              </div>
            </CardContent>
          </Card>

          {/* Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Cards</CardTitle>
              <CardDescription>Card variations and styles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Hover Effect</CardTitle>
                </CardHeader>
                <CardContent>
                  Hover to see the effect
                </CardContent>
              </Card>
              
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-white">Gradient Card</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  With gradient background
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status and label indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="gradient-primary">Gradient</Badge>
                <Badge className="gradient-secondary">Secondary</Badge>
                <Badge className="gradient-accent">Accent</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Animations Section */}
      <section className="container mx-auto">
        <h2 className="heading-2 mb-8">Animations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Hover Animations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="hover-lift p-4 bg-primary-100 rounded-lg text-center">
                Hover Lift
              </div>
              <div className="hover-grow p-4 bg-secondary-100 rounded-lg text-center">
                Hover Grow
              </div>
              <div className="hover-glow p-4 bg-accent-100 rounded-lg text-center">
                Hover Glow
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Motion Effects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div
                className="p-4 bg-primary-100 rounded-lg text-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Floating Animation
              </motion.div>
              <motion.div
                className="p-4 bg-secondary-100 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Scale on Hover
              </motion.div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative overflow-hidden p-4 bg-primary-100 rounded-lg">
                <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                Loading State
              </div>
              <motion.div
                className="p-4 bg-secondary-100 rounded-lg text-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Pulse Animation
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}