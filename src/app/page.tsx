"use client";

import dynamic from "next/dynamic";

const PlaceMatcherPage = dynamic(
  () => import("@/components/place-matcher/place-matcher-page"),
  { ssr: false }
);

export default function Page() {
  return <PlaceMatcherPage />;
}
