import HeaderLanding from "@/components/HeaderLanding";
import React from "react";
import { Marquee } from "@/components/ui/marquee";
import EachUtils from "@/utils/EachUtils";
import { LIST_COURSES } from "@/constants/listCourses";
import { LIST_HERO } from "@/constants/listHero";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="pt-16">
      <HeaderLanding />
      <div className="h-[calc(100vh-144px)] flex flex-col gap-y-2 items-center max-w-[1036px] mx-auto justify-center">
        <EachUtils
          of={LIST_HERO}
          render={(item) => (
            <>
              <h1 className="font-extrabold mb-5 leading-11 text-neutral-700 text-4xl text-center">
                {item.textHero}
              </h1>
              <Button className="w-55" variant={"primary"}>
                {item.signUpBtn}
              </Button>
              <Button className="w-55" variant={"sidebar"}>
                {item.loginBtn}
              </Button>
            </>
          )}
        />
      </div>
      <div className="h-20 border-2 border-steal-200 flex items-center">
        <Marquee
          className="w-[1036px] mx-auto [--gap:4rem] [--duration:10s]"
          pauseOnHover
        >
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
