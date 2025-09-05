"use client";

import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { is } from "zod/v4/locales";

interface ExperienceCardProps {
  title: string;
  org: string;
  timeframe: string;
  desc: string;
//   skills: string[]
  color: string;
  image: string;
}

export const ExperienceCard = ({ title, org, timeframe, desc, color, image }: ExperienceCardProps) => {

    const [isFront, setIsFront] = useState<boolean>(true);

    return (
        <div className={`border-4 rounded-lg border-black flex flex-col bg-[${color}] hover:scale-102 transition-transform  w-full`}>
            {isFront ?
                <div className="">
                    <Image
                        className="h-49 w-full object-cover object-center rounded-t-lg"
                        src={image}
                        alt="About Us Photo"
                        width={2000}
                        height={2000}
                    />
                    <div className=" p-3">
                        <div className="font-[heading-font] text-4xl">{title}</div>
                        <div className="font-[subheading-font] text-3xl">{org}</div>
                        <div className="font-[subheading-font] text-3xl">{timeframe}</div>
                        
                        {/* {skills.map((skill, index) => (
                            <div className={`border-3 border-black w-fit h-auto bg-[${color}] `}>
                                {skill[index]}
                            </div>
                        ))
                        } */}
                        <Button className={`font-[heading-font] text-xl text-black bg-[var(--sad-white)]  border-3 border-black p-1 rounded-lg hover:scale-102 transition-transform cursor-pointer my-4 px-3`} onClick={() => setIsFront(!isFront)}>click to see more!</Button>
                    </div>

                    
                </div>
                :

                <div className="p-3 w-auto h-fit flex flex-col translate-y-5">
                    <div className="font-[body-font] text-base whitespace-pre-line">{desc}</div>
                    <Button className={`justify-start font-[heading-font] text-xl text-black bg-[var(--sad-white)] w-fit border-3 border-black p-1 rounded-lg hover:scale-102 transition-transform cursor-pointer my-4 px-3`} onClick={() => setIsFront(!isFront)}>click to go back!</Button>
                </div>
            
            }
            
            

        </div>

    )

}