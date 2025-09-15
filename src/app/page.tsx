"use client";
import Image from "next/image";
// import {useEffect, useState} from "react";

// import { Music, Play, Pause } from 'lucide-react';

// import { Navbar } from "@/components/navbar";

// import {Button} from "@/components/ui/button";
// import { IntegerType } from "mongodb";

// const spotifyClient = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
// const spotifySecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;


export default function Home() {
  return (
    <div className="fixed w-screen h-screen overflow-hidden">
      <Image
              src="/grid.png"
              alt="grid"
              fill
              className="object-cover -z-10"
              priority
            />
            <div className="justify-center text-center align-middle place-self-center m-10 lg:m-20">
               <div className="bg-[var(--white)] white p-10 rounded-2xl">
                <img
                    src="/sprungerred.gif"
                    alt="sprunger"
                    className="w-full"
                    style={{ imageRendering: "pixelated" }}
                    
                />
                <div className="text-[var(--dark-blue)] font-bold text-4xl font-[heading-font] flex-wrap">under construction! stay tuned 🫶</div>

            </div>

            </div>
           

    </div>
  );
}
