import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import ImmigrationDashGame from "@/components/immigration-dash-game";

const GAME_URL = "https://thaivisachecklist.com/games/immigration-dash";

export const metadata: Metadata = {
  title: "Immigration Dash - Thai Visa Checklist Mini Game",
  description:
    "Play Immigration Dash, a lightweight arcade runner where you dodge immigration trouble, collect stamps, and share your score.",
  alternates: {
    canonical: GAME_URL,
  },
  openGraph: {
    url: GAME_URL,
    title: "Immigration Dash - Thai Visa Checklist Mini Game",
    description:
      "Play Immigration Dash, dodge immigration hazards, collect approval stamps, and challenge your best time.",
  },
  twitter: {
    title: "Immigration Dash - Thai Visa Checklist Mini Game",
    description:
      "Play Immigration Dash, dodge immigration hazards, collect approval stamps, and challenge your best time.",
  },
};

export default function ImmigrationDashPage() {
  return (
    <div className="min-h-svh bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-5 sm:py-10">
        <Card className="rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="p-4 sm:p-8">
            <h1 className="sr-only">Immigration Dash</h1>
            <p className="sr-only">
              Lightweight Thai Visa Checklist mini game. Jump, avoid obstacles, collect stamps, and share your score.
            </p>
            <div>
              <ImmigrationDashGame />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
