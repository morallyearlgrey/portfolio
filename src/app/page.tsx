"use client";
import Image from "next/image";
import {useEffect, useState} from "react";

import { Navbar } from "@/components/navbar";

export default function Home() {

  const [currentPage, setCurrentPage] = useState<String>("");
  const [currentRole, setCurrentRole] = useState<String>("");

  return (
    <div className="fixed w-screen h-screen overflow-hidden">
      <Image
        src="/grid.png"
        alt="grid"
        fill
        className="object-cover -z-10"
        priority
      />

      <div className="flex items-center justify-center h-screen w-screen p-10">
        <div className="bg-[var(--brown)] w-10/12 h-11/12 rounded-xl border-3 border-black flex flex-col">

          <div className="bg-[var(--dark-blue)] p-3 rounded-t-xl">
            <div className="flex flex-row -translate-y-2 gap-x-2">
              <Navbar/>
            </div>
          </div>
          
          <div className="bg-[var(--blue)] p-2 rounded-t-xl -translate-y-4 border-t-3 border-b-3 border-black">
            <div className="flex flex-row justify-between">
              <div className="px-4 w-1/2 bg-[var(--sad-white)] rounded-xl border-3 border-black">
                <span className="font-[heading-font] text-black text-3xl">welcome to my {currentPage}</span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-1 justify-between h-full overflow-y-auto custom-scrollbar p-4 flex-col gap-y-8">
            <div className="flex flex-row">
              <img
                src="/sprungerdev.gif"
                alt="sprunger"
                className="w-8/12"
                style={{ imageRendering: "pixelated" }}
              />
              <div className="w-full h-full flex justify-center flex-col gap-4">
                <div className="font-[heading-font] text-7xl">hi, my name is KAI</div>
                <div className="font-[subheading-font] text-4xl">i am a {currentRole}</div>
                <div className="font-[body-font] text-xl pr-15">sophomore majoring in computer science at the university of central florida</div>
              </div>
            </div>

            <div className="border-1 p-40">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
