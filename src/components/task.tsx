"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "@/components/navbar";

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

interface Tasks {
  _id: string;
  course: string;
  subject: string;
  description: string;
  isComplete: boolean;
}

interface TaskProps {
  course: string;
  isAdmin: boolean;
}

export const Task = ({ course, isAdmin }: TaskProps) => {

  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editSubject, setEditSubject] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [isShown, setIsShown] = useState<boolean>(false);

 const fetchTasks = async () => {
            const res = await fetch("/api/todo", { method: "GET" });
            const data = await res.json();
            setTasks(data.data);
          }
    

  const toggleComplete = async (task: Tasks) => {
    await fetch(`/api/todo?id=${task._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isComplete: !task.isComplete })
    });
    fetchTasks();
  };

  const startEdit = (task: Tasks) => {
    setEditTaskId(task._id);
    setEditSubject(task.subject);
    setEditDescription(task.description);
  };

  const saveEdit = async (task: Tasks) => {
    await fetch(`/api/todo?id=${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: editSubject, description: editDescription })
    });
    setEditTaskId(null);
    fetchTasks();
  };

  const deleteTask = async (task: Tasks) => {
    await fetch(`/api/todo?id=${task._id}`, {
      method: "DELETE" });
    fetchTasks();
  };
  useEffect(() => {
    fetchTasks();
  }, [course]);
  const formSchema = z.object({
    subject: z.string().optional(),
    description: z.string().optional(),
  });
  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { subject: "", description: "" },
  });

  const onSubmit = async (values: FormValues) => {
    await fetch('/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course, ...values, isComplete: false })
    });
    form.reset();
    fetchTasks();
  };
  return (
    <div className="bg-[var(--sad-white)] p-2 m-5 rounded-lg border-3 border-black text-black">
      <Button onClick={() => setIsShown(!isShown)} className=" h-fit font-[heading-font] text-2xl flex-wrap md:text-3xl w-full flex justify-between items-center">
        <span>{course}</span>
        <span className="hover:scale-102 cursor-pointer transition-transform">{isShown ? "▲" : "▼"}</span>
      </Button>
      {isShown && (
        <div className="mt-4">
          {tasks.filter((task) => task.course === course).map((task) => (
            <div key={task._id} className="h-fit p-3 rounded-lg border-black border-3 bg-[var(--light-blue)] flex flex-col my-2">
              <div className="flex flex-row gap-x-2 place-items-center">
                {isAdmin ? 
                <Button onClick={() => toggleComplete(task)}>
                  {task.isComplete ? (
                    <div className="font-[heading-font] text-lg md:text-2xl border-3 border-black p-1 md:p-3 rounded-sm flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-[var(--white)] cursor-pointer hover:scale-102 transition-transform">
                      X
                    </div>
                  ) : (
                    <div className="font-[heading-font] text-lg md:text-2xl border-3 border-black p-1 md:p-3 rounded-sm flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-[var(--white)] cursor-pointer hover:scale-102 transition-transform"></div>
                  )}
                </Button>
                :
                <Button>
                  {task.isComplete ? (
                    <div className="font-[heading-font] text-lg md:text-2xl border-3 border-black p-3 rounded-sm flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-[var(--white)]">
                      X
                    </div>
                  ) : (
                    <div className="font-[heading-font] text-lg md:text-2xl border-3 border-black p-3 rounded-sm flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-[var(--white)]"></div>
                  )}
                </Button>
                
              }
                
                {editTaskId === task._id ? (
                  <>
                    <div className="flex flex-col gap-y-2">
                      <input
                        className="font-[heading-font] text-2xl md:text-3xl border-3 border-black rounded px-2 mr-2"
                        value={editSubject}
                        onChange={e => setEditSubject(e.target.value)}
                      />
                      <input
                        className="font-[subheading-font] text-2xl  md:text-2xl border-3 border-black rounded px-2 mr-2"
                        value={editDescription}
                        onChange={e => setEditDescription(e.target.value)}
                      />
                    </div>
                    <div className="">
                    <Button className="bg-[var(--blue)] font-[heading-font] text-2xl md:text-2xl cursor-pointer hover:scale-102 transition-transform text-white border-3 border-black px-2 rounded-sm" onClick={() => saveEdit(task)}>save</Button>
                    <Button className="bg-[var(--dark-blue)] font-[heading-font] text-2xl  md:text-2xl cursor-pointer hover:scale-102 transition-transform text-white border-3 border-black px-2 rounded-sm" onClick={() => setEditTaskId(null)}>cancel</Button>
                  </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col basis-1/2">
                      <span className="font-[heading-font] text-xl md:text-2xl ">{task.subject}</span>
                      <span className="font-[subheading-font] text-lg md:text-xl">{task.description}</span>
                    </div>
                    {isAdmin ? 
                    <div className="">
                     <Button className="bg-[var(--yellow)] font-[heading-font] md:text-2xl cursor-pointer hover:scale-102 transition-transform text-white border-3 border-black px-2 rounded-sm" onClick={() => startEdit(task)}>edit</Button>
                    <Button className="bg-[var(--red)] font-[heading-font] md:text-2xl cursor-pointer hover:scale-102 transition-transform text-white border-3 border-black px-2 rounded-sm" onClick={() => deleteTask(task)}>delete</Button>
                 </div>
                 :
                 <div></div>
                  }
                    </>
                )}
              </div>
            </div>
          ))}
          {isAdmin ?
          (<Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 ">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[subheading-font] text-2xl">subject</FormLabel>
                    <FormControl>
                      <Input placeholder="insert subject..." className="font-[subheading-font]" {...field}/>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-[subheading-font] text-2xl">description</FormLabel>
                    <FormControl>
                      <Input placeholder="insert description..." className="font-[subheading-font]" {...field}/>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-[var(--orange)] cursor-pointer hover:scale-102 transition-transform text-white px-4 py-2 rounded-sm border-3 border-black font-[heading-font] text-2xl">add task</Button>
            </form>
          </Form>)
          :
          <div className=""></div>
          }
          
        </div>
      )}
    </div>
  );

}