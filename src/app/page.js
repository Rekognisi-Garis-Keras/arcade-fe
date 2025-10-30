import React from "react";

import HeaderLanding from "@/components/Landing/HeaderLanding";
import CourseMarquee from "@/components/Landing/CourseMarquee";
import HeroSection from "@/components/Landing/HeroSection";

const LandingPage = () => {
  return (
    <div className="pt-16">
      <HeaderLanding />
      <HeroSection />
      <CourseMarquee />
    </div>
  );
};

export default LandingPage;
