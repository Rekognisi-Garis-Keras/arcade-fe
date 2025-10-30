import React from "react";
import EachUtils from "@/utils/EachUtils";
import Image from "next/image";
import { LIST_FLOATING_IMAGE } from "@/constants/listFloatingImage";

const FloatingImages = () => {
  return (
    <>
      <EachUtils
        of={LIST_FLOATING_IMAGE}
        render={(image) => (
          <Image
            key={image.id}
            src={image.src}
            alt={image.alt}
            width={image.size.width}
            height={image.size.height}
            className={`absolute ${image.position} ${image.rotation} hidden md:block -z-5 drop-shadow-md`}
          />
        )}
      />
    </>
  );
};

export default FloatingImages;
