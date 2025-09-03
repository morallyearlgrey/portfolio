"use client";
import Image from "next/image";
import {useEffect, useState} from "react";

import { Navbar } from "@/components/navbar";

import { Button } from "@/components/ui/button";
import { Task } from "@/components/task";
import { Calendar } from "@/components/calendar";

import ResizableBoxWithLibrary from "@/components/resizeablebox";



export default function ToDo() {
   
  const [currentPage, setCurrentPage] = useState<String>("");


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
            <div className="h-full">
                <Image
                    className="h-full w-full object-cover object-center opacity-85 rounded-lg border-3 border-black"
                    src="/todo.gif"
                    alt="About Us Photo"
                    width={2000}
                    height={2000}
                />
                <div className="flex flex-col -translate-y-70 w-fit m-10 bg-[var(--darker-blue)] p-5 rounded-lg border-3 border-black">
                    <span className="font-[heading-font] text-7xl ">todo</span>
                    <span className="font-[subheading-font] text-3xl">come spy on my second brain...</span>
                </div>
            </div>

            <div className="flex flex-row gap-x-5 min-w-fit  overflow-x-clip flex-1">

                <div className="max-w-fit">
                {/* <ResizableBoxWithLibrary> */}

                <div className="flex bg-[var(--dark-blue)] h-fit border-3 border-black rounded-lg flex-col min-w-fit">
                    <div className="bg-[var(--sad-white)] p-2 m-5 rounded-lg border-3 border-black font-[heading-font] text-4xl text-black">lists</div>

                    <Task course="calculus II"/>
                    <Task course="systems software"/>
                    <Task course="discrete math"/>
                    <Task course="theatre survey"/>
                    <Task course="mobile app development"/>
                    
                    
                </div>

                {/* </ResizableBoxWithLibrary> */}
                </div>

                <div className="w-1/2 ">
                <div className="bg-[var(--dark-blue)] h-screen border-3 border-black rounded-lg ">
                    <div className="bg-[var(--sad-white)] p-2 m-5 rounded-lg border-3 border-black text-[var(--darker-blue)]">
                        <span className="font-[heading-font] text-4xl">calendar</span>

                    </div>
                    <div className="flex justify-center max-w-full">

                      <Calendar className="rounded-lg border-3 border-black m-5 w-[90%] max-w-xl h-100" />

                    </div>

                </div>
                </div>


            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
}