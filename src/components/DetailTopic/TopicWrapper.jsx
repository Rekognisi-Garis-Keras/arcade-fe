import React from "react";

const ContentWrapper = ({ children }) => {
  return (
    <div className=" flex-1 relative top-0 lg:pb-10 pb-20">{children}</div>
  );
};

export default ContentWrapper;
