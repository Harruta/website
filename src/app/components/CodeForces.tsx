import React from "react";
import { monoFont } from "../styles/fonts/fonts";

const CodeforcesLink: React.FC = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
         <h2 className={`${monoFont.className}`}>
         My CodeForces stats</h2>
      <iframe
        src="https://v0-next-js-codeforces-site.vercel.app/"
        className="w-full h-full border-none"
        title="Codeforces Site"
        scrolling="no"
      />
    </div>
  );
};

export default CodeforcesLink;
