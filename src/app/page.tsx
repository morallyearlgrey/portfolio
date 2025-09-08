"use client";
import Image from "next/image";
import {useEffect, useState} from "react";

import { Music, Play, Pause } from 'lucide-react';

import { Navbar } from "@/components/navbar";

import {Button} from "@/components/ui/button";
import { IntegerType } from "mongodb";

const spotifyClient = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const spotifySecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;


export default function Home() {
  const roles = ["A FULL--STACK SOFTWARE ENGINEER", "AN EMBEDDED SYSTEMS DEVELOPER", "AN UI & UX APPLICATIONS DESIGNER"]
  const [spotifySongName, setSpotifySongName] = useState<String>("bags");
  const [spotifySongArtist, setSpotifySongArtist] = useState<String>("clairo");

   const [count, setCount] = useState<number>(0);
   const [isRed, setIsRed] = useState<boolean>(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => (prevCount + 1)%roles.length);
    }, 7900);

    return () => clearInterval(intervalId);
  }, []); 


  useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://sdk.scdn.co/spotify-player.js';
  script.async = true;
  document.body.appendChild(script);
  // setCurrentRole(roles[(i+1)%roles.length]);

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
            <div className="flex flex-row gap-x-2">
              <div className="px-4 w-1/2 bg-[var(--sad-white)] rounded-xl border-3 border-black">
                <span className="font-[heading-font] text-black text-3xl">welcome to my home</span>
              </div>
              <div className="px-4 w-3/4 bg-[var(--sad-white)] rounded-xl border-3 border-black flex flex-row items-center gap-x-2">
                {/* <Music className="text-black"/>
                <span className="font-[heading-font] text-black text-3xl">playing {spotifySongName} by {spotifySongArtist}</span>
                <Button onClick = {() => player.play()}className="hover:scale-110 transition-transform cursor-pointer"><Play className="text-black scale-150"/></Button>
                <Button className="hover:scale-110 transition-transform cursor-pointer"><Pause className="text-black scale-150"/></Button> */}
              </div>
            </div>
          </div>

          {/* <iframe data-testid="embed-iframe" style="border-radius:12px"  width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}

          <div className="w-full flex flex-1 justify-between h-full overflow-y-auto custom-scrollbar p-4 flex-col gap-y-8">
            <div className="flex flex-row">
              <div className="flex flex-col w-6/12">

              <Button onClick={() => {setIsRed(!isRed)}} className="h-full cursor-pointer hover:scale-102 transition-transform">
              {isRed ?
               <img
                src="/sprungerred.gif"
                alt="sprunger"
                className="w-full"
                style={{ imageRendering: "pixelated" }}
              />
              :
               <img
                src="/sprungerblue.gif"
                alt="sprunger"
                className="w-full"
                style={{ imageRendering: "pixelated" }}
              />
              }
             
               </Button>
            
              </div>

              
              <div className="w-full h-full flex justify-center flex-col gap-4">
                <div className="font-[heading-font] text-7xl">hi, my name is KAI</div>
                  <div className="flex flex-row place-items-center gap-x-4">
                  <div className="font-[subheading-font] text-4xl">i am</div>
                  <span className="typewriter font-[subheading-font] text-4xl flex flex-wrap whitespace-normal break-words max-w-fit text-[var(--red)]">{roles[count]}</span>
                </div>
                
                <div className="font-[body-italic-font] text-xl pr-15">sophomore majoring in computer science at the university of central florida</div>
              </div>
            </div>

            <div className="border-1 p-40">
                <span className="text-white">WORK IN PROGRESS!!!!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
