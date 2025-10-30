import React from "react";

const AsideWrapper = ({ children }) => {
  return (
    <aside className="hidden lg:block w-[270px] shrink-0">
      <div className="sticky top-24 bg-white p-4 rounded-xl border-2 border-b-4 border-r-4 ">
        {/* ini jarak dari atas, biar ga ketiban navbar */}
        {children}
      </div>
    </aside>
  );
};

export default AsideWrapper;
