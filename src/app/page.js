import React from "react";
import Image from "next/image";
import HeaderLanding from "@/components/Landing/HeaderLanding";
import { Marquee } from "@/components/ui/marquee";
import EachUtils from "@/utils/EachUtils";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";

import { LIST_COURSES } from "@/constants/listCourses";
import { LIST_HERO } from "@/constants/listHero";

const LandingPage = () => {
  return (
    <div className="pt-16">
      <HeaderLanding />
      <div className="relative h-[calc(100dvh-144px)] px-5 md:px-[50px] lg:px-0 flex flex-col gap-y-2 items-center lg:max-w-[1036px] mx-auto justify-center">
        <Image
          src="/astronaut.png"
          alt="astronaut"
          width={90}
          height={90}
          className="absolute animate-spin left-[7%] bottom-[13%] rotate-250 hidden md:block -z-5 drop-shadow-md"
        />
        <Image
          src="/calculator.png"
          alt="calculator"
          width={55}
          height={55}
          className="absolute animate-bounce right-[7%] top-[50%] rotate-230 -z-5 drop-shadow-md hidden md:block "
        />
        <Image
          src="/heart.png"
          alt="heart"
          width={70}
          height={70}
          className="absolute animate-ping left-[20%] top-[10%] -rotate-50 -z-5 drop-shadow-md hidden md:block"
        />

        <div className="flex flex-row gap-x-2">
          <KbdGroup>
            <Kbd>Alt</Kbd>
            <span>+</span>
            <Kbd>Fn 4</Kbd>
          </KbdGroup>
          <p>for better experience!</p>
        </div>
        <EachUtils
          of={LIST_HERO}
          render={(item) => (
            <>
              <h1 className="mix-blend-multiply font-extrabold mb-5 leading-9 lg:leading-11 text-neutral-700 lg:text-4xl text-center md:text-3xl text-2xl">
                {item.textHero}
              </h1>
              <Button size={"lg"} className="w-55" variant={"primary"}>
                {item.signUpBtn}
              </Button>
              <Button size={"lg"} className="w-55" variant={"sidebar"}>
                {item.loginBtn}
              </Button>
            </>
          )}
        />
      </div>
      <div className="h-20 border-2 border-steal-200 flex items-center">
        <Marquee className="max-w-[1036px] mx-auto [--gap:4rem] [--duration:10s]">
          <div className="flex items-center gap-x-12">
            <EachUtils
              of={LIST_COURSES}
              render={(item) => (
                <div key={item.id} className="flex flex-row items-center">
                  <Image
                    key={item.id}
                    alt={item.subject}
                    width={40}
                    height={40}
                    src={item.iconSrc}
                    className="mr-4"
                  />
                  <span className="text-lg font-bold">{item.subject}</span>
                </div>
              )}
            />
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default LandingPage;
