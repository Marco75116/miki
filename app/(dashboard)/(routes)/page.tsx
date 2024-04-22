import Image from "next/image";
import React from "react";
import river from "@/lib/assets/designs/river-removebg-preview.png";
import coins from "@/lib/assets/designs/coins.png";
const Page = () => {
  return (
    <div className="relative h-full flex justify-center">
      <div className="flex mt-[17vh] text-5xl font-light leading-[3.5rem] word-spacing-wide">
        <span>
          <span className="font-semibold"> miki </span> allow users to
          efficiently and <br />
          effortlessly create, trade, and lend <br />
          liquidity through one powerful platform.
        </span>
      </div>
      <div className="opacity-35 ">
        <Image
          src={river}
          alt="river"
          height={700}
          className="absolute left-[-20%] bottom-[-50%] rotate-45"
        />
      </div>
      <Image
        className="absolute left-[12%] bottom-[9%]"
        src={coins}
        alt="coins"
        height={340}
      />
    </div>
  );
};

export default Page;
