import React from "react";
import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex flex-col items-center justify-center flex-1 px-6 pb-10 text-center md:justify-start gap-y-8">
        <Heading />
        <Heroes />
      </div>
    </div>
  );
};

export default LandingPage;
