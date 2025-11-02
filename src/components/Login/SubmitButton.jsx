import React from "react";
import { Button } from "@/components/UI/button";

const SubmitButton = ({ children, type = "submit", disabled = false }) => {
  return (
    <Button
      type={type}
      variant="primary"
      className="w-full cursor-pointer"
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
