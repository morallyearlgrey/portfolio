"use client";
import Image from "next/image";

import { Navbar } from "@/components/navbar";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {ExperienceCard} from "@/components/experiencecard";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { Task } from "@/components/task";
import { Calendar } from "@/components/calendar";

import ResizableBoxWithLibrary from "@/components/resizeablebox";

const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;


export default function Experience() {  
    useEffect(() => {
  
    }, []);
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
                <span className="font-[heading-font] text-black text-3xl">welcome to my experience</span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-1 justify-between h-full overflow-y-auto custom-scrollbar p-4 flex-col ">
            <div className="h-full">
                <Image
                    className="h-full w-full object-cover object-center opacity-85 rounded-lg border-3 border-black"
                    src="/experience.gif"
                    alt="About Us Photo"
                    width={2000}
                    height={2000}
                />
                <div className="flex flex-col -translate-y-45 w-fit m-10 bg-[var(--darker-blue)] py-3 px-12 rounded-lg border-3 border-black">
                    <span className="font-[heading-font] text-7xl ">experience</span>
                </div>
                <div className="grid grid-cols-3 flex-wrap gap-4 -translate-y-30">

               <ExperienceCard title="SWE Intern" org="NVIDIA" timeframe="May 2025 – August 2025" desc={`• Contributed to the LibOS Team and Core RISCV Team in the GPU Software Resource Management Department.\n• Increased the code coverage from 77.7% to 97.1% for a RISC-V OS library critical to dGPU and Tegra.\n• Made tests simulating microkernel processes to validate edge cases and prevent regressions across 230 functions.\n• Revealed 8 critical bugs on inter-process communication and thread local storage, implementing solutions for 4.`} color="var(--darker-blue)" image="/nvidia.jpeg" />
               {/* skills={["", ""]} */}
               <ExperienceCard title="Software Chair" org="IEEE UCF" timeframe="April 2025 – Present" desc={`• Developed new club website using the MERN stack, featuring real-time data analytics, club information, and relevant projects/events to enhance user engagement by 25% and increase annual visitors to 2,500.\n• Implementing CRUD operations and regular updates for a resume database storing 50+ user resumes.\n• Building a Discord bot in JavaScript to streamline task management for 400+ club members.`} color="var(--red)" image="/softwarechair.png" />
               <ExperienceCard title="Hackathon Organizer" org="Knight Hacks" timeframe="Dec. 2025 – Present" desc={`• Co-leading the organization of Knight Hacks’ 8th annual hackathon, accommodating 1000+ attendees.\n• Collaborating on the development of the event itinerary for 50+ events, ensuring alignment with goals.\n• Co-leading 30+ volunteers, enhancing execution of task delegation and event performance by 20%.\n• Securing sponsorship relationships with companies in order to meet funding goal of $40,000.\n`} color="var(--yellow)" image="/hackorg.jpeg" />
               <ExperienceCard title="Mentor" org="Kickstart" timeframe="Sep. 2025 – Present" desc={``} color="var(--dark-blue)" image="/grid.png" />
               <ExperienceCard title="Professional Chair" org="IEEE UCF" timeframe="Jan. 2025 – April 2025" desc={`• Co-led 7 workshops, assisting 150+ attendees in advancing their careers through career tools, networking, and internships and research opportunities.\n• Developed 3 engaging PowerPoint presentations on career fair readiness, mock interviews, and resumes.\n• Programmed an e-portfolio website template using JavaScript, HTML, and CSS, and wrote detailed usage instructions, resulting in 30+ unique clones by IEEE members.`} color="var(--orange)" image="/officers.jpeg" />



            </div>
            </div>

            
            
            
          </div>
        </div>
      </div>
    </div>
  );
}