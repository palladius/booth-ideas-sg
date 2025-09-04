"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Soup, BookOpen } from "lucide-react";
import { fondueProfiles, recipes } from "@/lib/data";

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState(fondueProfiles[0]);
  const [temperature, setTemperature] = useState(42);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Smart Fondue Pot</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Temperature Monitor */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Thermometer className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{temperature}°C</div>
              <p className="text-xs text-muted-foreground">
                Optimal temperature for {selectedProfile.name}
              </p>
            </CardContent>
          </Card>

          {/* Fondue Profiles */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Fondue Profiles</CardTitle>
              <Soup className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                {fondueProfiles.map((profile) => (
                  <Button
                    key={profile.name}
                    variant={selectedProfile.name === profile.name ? "default" : "outline"}
                    onClick={() => {
                      setSelectedProfile(profile);
                      setTemperature(profile.optimalTemperature);
                    }}
                  >
                    {profile.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recipes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Recipes</CardTitle>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                {recipes.map((recipe) => (
                  <a
                    key={recipe.name}
                    href={recipe.url}
                    className="text-sm hover:underline"
                  >
                    {recipe.name}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
