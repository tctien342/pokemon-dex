import { Metadata } from "next";
import { HomePageContent } from "./page.content";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pokemon World",
  description: "Welcome to Pokemon world",
};

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
