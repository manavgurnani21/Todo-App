"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Palette, Sparkles } from "lucide-react"

export function ThemeDemo() {
  return (
    <Card className="w-full max-w-md mx-auto mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <CardTitle>Dark Mode Ready</CardTitle>
        </div>
        <CardDescription>
          Toggle between light, dark, and system themes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Primary
          </Button>
          <Button variant="outline" size="sm">
            Outline
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          All components automatically adapt to your theme preference.
        </p>
      </CardContent>
    </Card>
  )
}