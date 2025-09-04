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

const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;


export default function ToDo() {
   
  const [admin, setAdmin] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

    const formSchema = z.object({
      password: z.string().optional()
    });
    type FormValues = z.infer<typeof formSchema>;
    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: { password: ""},
    });

  const onSubmit = async (values: FormValues) => {
    if(values.password==PASSWORD) {
      setAdmin(true);
      setMessage("you're in!");

    } else {
      setAdmin(false);
      setMessage("incorrect password!");

    }
    form.reset();
  };

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
                <span className="font-[heading-font] text-black text-3xl">welcome to my todo</span>
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
                <div className="flex flex-col -translate-y-75 w-fit m-10 bg-[var(--darker-blue)] py-3 px-12 rounded-lg border-3 border-black">
                    <span className="font-[heading-font] text-7xl ">todo</span>
                    <div className="flex flex-row">
                      
                      <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="flex flex-col justify-center">
                              <FormLabel>
                                <span className="font-[subheading-font] text-2xl">enter password to edit lists: </span>
                              </FormLabel>
                              <div className="flex flex-col">
                              <FormControl>
                                  <Input type={"password"} {...field} />
                              </FormControl>
                              <FormDescription>
                                <span className="font-[body-italic-font]">{message}</span>
                              </FormDescription>
                              </div>
                              <FormMessage/>
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="bg-[var(--dark-blue)] font-[heading-font] text-2xl cursor-pointer hover:scale-102 transition-transform text-white border-3 border-black px-2 rounded-lg">submit</Button>
                      </form>
                    </Form>

                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-x-5 min-w-fit  overflow-x-clip flex-1 ">

                <div className="max-w-fit">
                {/* <ResizableBoxWithLibrary> */}

                <div className="flex bg-[var(--dark-blue)] h-fit border-3 border-black rounded-lg flex-col min-w-fit">
                    <div className="bg-[var(--sad-white)] p-2 m-5 rounded-lg border-3 border-black font-[heading-font] text-4xl text-black">lists</div>
                    
                    <Task course="general" isAdmin={admin}/>
                    <Task course="calculus II" isAdmin={admin}/>
                    <Task course="systems software" isAdmin={admin}/>
                    <Task course="discrete math" isAdmin={admin}/>
                    <Task course="theatre survey" isAdmin={admin}/>
                    <Task course="mobile app development" isAdmin={admin}/>
                    
                    
                </div>

                {/* </ResizableBoxWithLibrary> */}
                </div>

                <div className="w-3/4">
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