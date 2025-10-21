"use client";
import Image from "next/image";
import {useEffect, useState} from "react";
import Link from "next/link";

import {ArrowLeft, ArrowRight, RotateCw, HomeIcon, RabbitIcon, LogInIcon, Music, Play, Pause } from 'lucide-react';

import { Navbar } from "@/components/navbar";

import {Button} from "@/components/ui/button";
import { IntegerType, Timestamp } from "mongodb";

const spotifySecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

import Audioplayer from "@/components/audioplayer";

import { useSession } from "next-auth/react";
// https://open.spotify.com/playlist/6GVL0jh0FnEUdlMewMF9uC?si=QUYpe_HzSVi4z8PA_QfB9Q&pi=GReYV9-PRYya1

export default function Home() {
   const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated"; 
    
  const roles = ["A FULL--STACK SOFTWARE ENGINEER", "AN EMBEDDED SYSTEMS DEVELOPER", "AN UI & UX APPLICATIONS DESIGNER"]
  const [spotifySongName, setSpotifySongName] = useState<String>("");
  const [spotifySongArtist, setSpotifySongArtist] = useState<String>("");

   const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => (prevCount + 1)%roles.length);
    }, 7900);

    return () => clearInterval(intervalId);
  }, []); 



    const [curTime, setCurTime] = useState<Date>(new Date());

useEffect(() => {
  const timer = setInterval(() => {
    setCurTime(new Date()); // updates every second
  }, 1000);

  return () => clearInterval(timer); // cleanup
}, []);


  useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://sdk.scdn.co/spotify-player.js';
  script.async = true;
  document.body.appendChild(script);
  // setCurrentRole(roles[(i+1)%roles.length]);

}, []);

 
  return (
    <div className="fixed w-screen h-screen overflow-hidden flex-col ">
      <Image
        src="/grid.png"
        alt="grid"
        fill
        className="object-cover -z-10"
        priority
      />
        <div className="bg-[var(--brown)] border-b-3 border-black h-10 w-full flex justify-between  p-2 ">
          <div className="flex flex-row place-items-center gap-x-3">
              <RabbitIcon className="text-white"/>
                <span className="font-[heading-font] text-white text-xl">kai sprunger's portfolio</span>
                {isLoggedIn ? (<div className="text-[var(--red)] font-[heading-font] text-xl">[logged in]</div>) : (<div className="text-[var(--red)] font-[heading-font] text-xl">[not logged in]</div>)}
          </div>
          <div className="flex flex-row place-items-center gap-x-3">
                <span className="font-[heading-font] text-white text-xl">{curTime?.toString()}</span>

          </div>

        </div>

      <div className="flex items-center justify-center h-screen w-screen py-5 gap-y-4 flex-col">
        
        <div className="bg-[var(--darker-blue)] w-10/12 h-10/12 rounded-xl border-3 border-black flex flex-col">

          <div className="z-50">
            <div className="flex flex-row pr-3 pl-3 pt-1 rounded-t-xl gap-x-2 bg-[var(--dark-blue)] z-10">
              <Navbar/>
            </div>
          </div>
          <div className="bg-[var(--dark-blue)]">
          <div className="bg-[var(--blue)] p-2 rounded-t-xl  border-t-3 border-b-3 border-black z-0">
            <div className="flex flex-row gap-x-2">
              <div className="px-4 w-fit rounded-xl  border-black flex-row flex place-items-center gap-x-3">
                <ArrowLeft className="text-black"/>
                <ArrowRight className="text-black"/>
                <RotateCw className="text-black"/>

                <Link href="/auth/signin">
                  <LogInIcon className="text-black hover:scale-115 transition-all cursor-pointer hover:text-[var(--red)]"/>
                </Link>
                
              </div>
              <div className="px-4 w-full bg-[var(--sad-white)] rounded-xl border-3 border-black flex flex-row items-center gap-x-2">
                <span className="default font-[heading-font] text-black text-3xl">welcome to my home</span>
                {/* <audio controls>
                  <source src="" type="mpeg"></source>

                </audio> */}

                <Audioplayer>

                </Audioplayer>
                
                {/* <Music className="text-black"/>
                <span className="font-[heading-font] text-black text-3xl">playing {spotifySongName} by {spotifySongArtist}</span>
                <Button onClick = {() => player.play()}className="hover:scale-110 transition-transform cursor-pointer"><Play className="text-black scale-150"/></Button>
                <Button className="hover:scale-110 transition-transform cursor-pointer"><Pause className="text-black scale-150"/></Button> */}
              </div>
            </div>
          </div>
          </div>

          {/* <iframe data-testid="embed-iframe" style="border-radius:12px"  width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}

          <div className="w-full flex flex-1 justify-between h-full overflow-y-auto custom-scrollbar p-4 flex-col gap-y-8">
             <Image
                                  className="h-full w-full translate-y-10 object-cover object-top opacity-60"
                                  src="/clouds.png"
                                  alt="About Us Photo"
                                  width={2000}
                                  height={2000}
                              />
            <div className="flex flex-row -translate-y-120">
             
              <div className="flex flex-col w-6/12">
              
                      
              <Button className="h-full hover:scale-102 transition-transform -translate-y-1">
              <Image
                                  className="w-full h-100 -translate-y-1/12 object-cover"
                                  src="/kai-sprunger.png"
                                  alt="About Us Photo"
                                  width={2000}
                                  height={2000}
                                  quality={100}
                              />
               
             
               </Button>
            
              </div>

              
              <div className="w-full h-full flex flex-col">
                
                <div className="font-[heading-font] flex flex-col">
                  <span className=" text-[70px] translate-y-15 text-[var(--white)]">hi, my name is</span>
                  <span className=" text-[130px] text-[var(--light-blue)] ">KAI SPRUNGER</span>
                  <span className="typewriter text-[40px] max-w-fit -translate-y-10">i am a software engineer</span>
                  <img
                src="/bunny.gif"
                alt="sprunger"
                className="w-1/3 -translate-y-6/12  place-self-end  hover:scale-102 transition-transform "
                style={{ imageRendering: "pixelated" }}
              />
                  
                </div>
                

                  {/* <div className="flex flex-row place-items-center gap-x-4 -translate-y-5">
                  <div className="font-[subheading-font] text-4xl">i am</div>
                  <span className="typewriter font-[subheading-font] text-4xl flex flex-wrap whitespace-normal break-words max-w-fit text-[var(--red)]">{roles[count]}</span>
                </div> */}
                
                
              </div>
              
            </div>

            <div className="-translate-y-150 flex flex-row justify-between basis-1/4 gap-3  ">
                <div className="bg-[var(--light-blue)] h-70 font-[heading-font] text-[var(--blue)] w-full rounded-xl hover:scale-102 transition-all place-content-center text-center flex flex-col">
                  <span className="text-8xl">3+</span>
                  <span className="text-4xl">technical project winner</span>
                </div>
                <div className="bg-[var(--blue)] w-full h-50 p-5 font-[heading-font] rounded-xl hover:scale-102 transition-all"></div>
                <div className="bg-[var(--dark-blue)] w-full h-50 p-5 font-[heading-font] rounded-xl hover:scale-102 transition-all"></div>
                <div className="bg-[var(--darker-blue)] h-50 w-full p-5 font-[heading-font]  rounded-xl hover:scale-102 transition-all"></div>
                
            </div>
            
          </div>
          
        </div>
        <div className="border-3 border-black h-full w-11/12 mb-15  rounded-2xl">
              <div className="bg-[var(--brown)] h-full opacity-70  rounded-xl flex-row flex">
                <Link href="https://www.linkedin.com/in/kaisprunger/" className="hover:scale-105 transition-transform">
                  <div className="bg-white p-1 rounded-md m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--dark-blue)" viewBox="0 0 16 16">
                              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                              </svg>

                  </div>
                </Link>
                <Link href="https://github.com/morallyearlgrey" className="hover:scale-105 transition-transform">
                          <div className="bg-white p-1 rounded-md m-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--red)" className="bi bi-github" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
        </svg>
                </div>

                </Link>
                
             
                <Link href="/Sprunger_Kai_Resume.pdf" className="hover:scale-105 transition-transform">

                            <div className="bg-white p-1 rounded-md m-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--yellow)" className="bi bi-file-person" viewBox="0 0 16 16">
              <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            </svg>
                            </div>
             </Link>

                {/* <div className="bg-white p-5 rounded-md m-2">

                </div> */}

              </div>
        </div>

      </div>
    </div>
  );
}
