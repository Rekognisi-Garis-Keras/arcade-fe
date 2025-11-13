import React from "react";

import HeaderLanding from "@/components/Landing/HeaderLanding";
import CourseMarquee from "@/components/Landing/CourseMarquee";
import HeroSection from "@/components/Landing/HeroSection";

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[conic-gradient(at_center,_#ffe2e2,_#fefce8,_#dcfce7,_#b8e6fe,_#eff6ff,_#ede9fe)] scale-150 blur-3xl opacity-50 rounded-full animate-[spin_20s_linear_infinite]"></div>

      <div className="pt-16 relative z-10">
        <HeaderLanding />
        <HeroSection />
        <CourseMarquee />
      </div>
    </div>
  );
}
