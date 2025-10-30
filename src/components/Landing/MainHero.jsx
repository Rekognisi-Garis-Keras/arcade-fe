import React from "react";
import EachUtils from "@/utils/EachUtils";
import { Button } from "../UI/button";
import { LIST_HERO } from "@/constants/listHero";

const MainHero = () => {
  return (
    <EachUtils
      of={LIST_HERO}
      render={(item, index) => (
        <React.Fragment key={index}>
          <h1 className="mix-blend-multiply font-extrabold mb-5 leading-9 lg:leading-11 text-neutral-700 lg:text-4xl text-center md:text-3xl text-2xl">
            {item.textHero}
          </h1>
          <Button size={"lg"} className="w-55" variant={"primary"}>
            {item.signUpBtn}
          </Button>
          <Button size={"lg"} className="w-55" variant={"sidebar"}>
            {item.loginBtn}
          </Button>
        </React.Fragment>
      )}
    />
  );
};

export default MainHero;
