"use client";
import Image from "next/image";

import { Navbar } from "@/components/navbar";

import Link from "next/link";
import React, { useState, useEffect } from "react";

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
import { ProjectCard } from "@/components/projectcard";

const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;


export default function ToDo() {  

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
                <span className="font-[heading-font] text-black text-3xl">welcome to my projects</span>
                
              </div>
            </div>
          </div>

          <div className="w-full flex flex-1 justify-between h-full overflow-y-auto custom-scrollbar p-4 flex-col gap-y-8">
            <div className="h-full">
                <Image
                    className="h-full w-full object-cover object-center opacity-85 rounded-lg border-3 border-black"
                    src="/projects.gif"
                    alt="About Us Photo"
                    width={2000}
                    height={2000}
                />
                <div className="flex flex-col -translate-y-45 w-fit m-10 bg-[var(--darker-blue)] py-3 px-12 rounded-lg border-3 border-black">
                    <span className="font-[heading-font] text-7xl ">projects</span>
                </div>
            </div>

                  <div className="gap-4 grid grid-cols-1 h-full">
            
                        <ProjectCard title="example 1" link="" img="/grid.png" color="#ffffff" desc="" skills={["skill 1", "skill 2"]} />
                        
                          
            
            
                      </div>
                    </div>
            </div>
            
            
          </div>
        </div>
  );
}