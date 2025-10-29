import React from "react";

const StickyWrapper = ({ children }) => {
  return (
    <div className="hidden lg:block w-[368px] bg-blue-300/80 sticky top-6 self-end bottom-6">
      <div className="min-h-[calc(100vh-48px)] sticky top-6 flex flex-col gap-y-4">
        {children}
      </div>
    </div>
  );
};

export default StickyWrapper;
