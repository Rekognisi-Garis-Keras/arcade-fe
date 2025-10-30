import React from "react";
import FloatingImages from "./FloatingImages";
import DesktopHint from "./DesktopHint";
import MainHero from "./MainHero";

const HeroSection = () => {
  return (
    <div className="relative h-[calc(100dvh-144px)] px-5 md:px-[50px] lg:px-0 flex flex-col gap-y-2 items-center lg:max-w-[1036px] mx-auto justify-center">
      <FloatingImages />
      <DesktopHint />
      <MainHero />
    </div>
  );
};

export default HeroSection;
