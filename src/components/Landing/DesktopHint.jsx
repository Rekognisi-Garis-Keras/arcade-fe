import React from "react";
import { KbdGroup, Kbd } from "../UI/kbd";

const DesktopHint = () => {
  return (
    <div className="flex flex-row gap-x-2">
      <KbdGroup>
        <Kbd>Fn</Kbd>
        <span>+</span>
        <Kbd>F11</Kbd>
      </KbdGroup>
      <p>for better experience!</p>
    </div>
  );
};

export default DesktopHint;
