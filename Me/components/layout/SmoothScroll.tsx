"use client";

import { useEffect } from "react";
import { initSmoothAnchors } from "@/lib/scroll";

export function SmoothScroll() {
  useEffect(() => initSmoothAnchors(), []);
  return null;
}
