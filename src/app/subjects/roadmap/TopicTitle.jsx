import React from "react";

const TopicTitle = ({ text }) => {
  return (
    <div className="relative mb-3">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-2 border-gray-300 rounded-full"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-3 text-lg font-bold  text-gray-500 bg-white">
          {text}
        </span>
      </div>
    </div>
  );
};

export default TopicTitle;
