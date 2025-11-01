import React from "react";

const ARCamera = ({ title }) => {
  return (
    <div className="relative">
      <iframe
        src={`https://badzlan.is-a.dev/test-ar/?model=${title}`}
        width="100%"
        height="600px"
        title="AR"
        className="rounded-xl my-5"
        allow="camera; microphone; fullscreen; xr-spatial-tracking;"
      ></iframe>
      <div className="h-full w-full absolute top-0 left-0 bg-transparent"></div>
    </div>
  );
};

export default ARCamera;
