import React, { useState, useEffect } from "react";
import { Trash2, GripVertical } from 'lucide-react';

interface Tasks {
  _id: string;
  course: string;
  subject: string;
  isComplete: boolean;
  color?: string;
  order?: number;
}

interface TaskProps {
  course: string;
  isAdmin: boolean;
  colorSet: string;
}

export const Task = ({ course, isAdmin, colorSet }: TaskProps) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [draggedTask, setDraggedTask] = useState<Tasks | null>(null);

  const fetchTasks = async () => {
    const res = await fetch("/api/todo", { method: "GET" });
    const data = await res.json();
    setTasks(data.data);
  };

  const toggleComplete = async (task: Tasks) => {
    await fetch(`/api/todo?id=${task._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isComplete: !task.isComplete })
    });
    fetchTasks();
  };

  const updateTaskText = async (task: Tasks, newText: string) => {
    await fetch(`/api/todo?id=${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: newText, description: "" })
    });
    fetchTasks();
  };

  const deleteTask = async (task: Tasks) => {
    await fetch(`/api/todo?id=${task._id}`, {
      method: "DELETE"
    });
    fetchTasks();
  };

  const updateTaskOrder = async (reorderedTasks: Tasks[]) => {
    // Update order for all tasks in this course
    const updatePromises = reorderedTasks.map((task, index) => 
      fetch(`/api/todo?id=${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: index })
      })
    );
    await Promise.all(updatePromises);
    fetchTasks();
  };

  const createTask = async () => {
    if (!newTaskText.trim()) return;
    
    const courseTasks = tasks.filter(t => t.course === course);
    const maxOrder = courseTasks.length > 0 ? Math.max(...courseTasks.map(t => t.order || 0)) : -1;
    
    await fetch('/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        course, 
        subject: newTaskText, 
        isComplete: false,
        color: colorSet,
        order: maxOrder + 1
      })
    });
    setNewTaskText("");
    fetchTasks();
  };

  const handleDragStart = (e: React.DragEvent, task: Tasks) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetTask: Tasks) => {
    e.preventDefault();
    
    if (!draggedTask || draggedTask._id === targetTask._id) {
      setDraggedTask(null);
      return;
    }

    const courseTasks = tasks.filter(t => t.course === course)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    
    const draggedIndex = courseTasks.findIndex(t => t._id === draggedTask._id);
    const targetIndex = courseTasks.findIndex(t => t._id === targetTask._id);
    
    const reordered = [...courseTasks];
    const [removed] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, removed);
    
    updateTaskOrder(reordered);
    setDraggedTask(null);
  };

  const handleTaskInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleTaskKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, task: Tasks) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substring(0, cursorPosition);
      const textAfterCursor = textarea.value.substring(cursorPosition);
      
      const lines = textBeforeCursor.split('\n');
      const currentLine = lines[lines.length - 1];
      const indentMatch = currentLine.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';
      
      const newIndent = currentIndent + '  ';
      const newText = textBeforeCursor + '\n' + newIndent + textAfterCursor;
      
      textarea.value = newText;
      textarea.selectionStart = textarea.selectionEnd = cursorPosition + 1 + newIndent.length;
      
      const event = new Event('input', { bubbles: true });
      textarea.dispatchEvent(event);
      
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  const handleNewTaskInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    setNewTaskText(textarea.value);
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleNewTaskKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      createTask();
    } else if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substring(0, cursorPosition);
      const textAfterCursor = textarea.value.substring(cursorPosition);
      
      const lines = textBeforeCursor.split('\n');
      const currentLine = lines[lines.length - 1];
      const indentMatch = currentLine.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';
      
      const newIndent = currentIndent + '  ';
      const newText = textBeforeCursor + '\n' + newIndent + textAfterCursor;
      
      setNewTaskText(newText);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 1 + newIndent.length;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }, 0);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [course]);

  const sortedTasks = tasks
    .filter((task) => task.course === course)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="bg-[var(--sad-white)] p-4 mt-1 mb-1 rounded-lg border-3 border-black text-black"
    style={{ backgroundColor: colorSet }}>
      <button 
        onClick={() => setIsShown(!isShown)} 
        className="h-fit font-[heading-font] text-2xl flex-wrap md:text-3xl w-full flex justify-between items-center hover:opacity-80 transition-opacity border-3 pr-3 pl-3 rounded-md bg-[var(--sad-white)]"
      >
        <span>{course}</span>
        <span className="hover:scale-110 text-2xl cursor-pointer transition-transform">{isShown ? "▼" : "▶"}</span>
      </button>
      
      {isShown && (
        <div className="mt-2 space-y-2 border-3 p-2 rounded-md bg-[var(--sad-white)]">
          {sortedTasks.map((task) => (
            
            <div 
              key={task._id} 
              draggable={isAdmin}
              onDragStart={(e) => isAdmin && handleDragStart(e, task)}
              onDragOver={(e) => isAdmin && handleDragOver(e)}
              onDrop={(e) => isAdmin && handleDrop(e, task)}
              className={`h-fit pr-3 pl-3 pt-1 rounded-lg border-black border-3 bg-[var(--light-blue)] flex flex-row gap-x-2 items-start ${isAdmin ? 'cursor-move' : ''} ${draggedTask?._id === task._id ? 'opacity-50' : ''}`}
            >
              {isAdmin && (
                <>
                 <button
                    onClick={() => isAdmin && toggleComplete(task)}
                    disabled={!isAdmin}
                    className={`hover:scale-105 font-[heading-font] text-lg md:text-2xl border-2 border-black rounded-sm flex items-center justify-center h-5 w-5 md:w-5 md:h-5 bg-[var(--white)] flex-shrink-0 mt-1 ${isAdmin ? 'cursor-pointer hover:scale-102 transition-transform' : ''}`}
                  >
                    {task.isComplete && "X"}
                  </button>
                 <textarea
                  defaultValue={task.subject}
                  onBlur={(e) => updateTaskText(task, e.target.value)}
                  onInput={handleTaskInput}
                  onKeyDown={(e) => isAdmin && handleTaskKeyDown(e, task)}
                  disabled={!isAdmin}
                  className={`p-1 font-[body-font] text-sm flex-1 bg-transparent border-b-2 border-transparent  outline-none resize-none whitespace-pre-wrap overflow-hidden ${isAdmin ? '' : 'cursor-default'}`}
                  style={{ fontFamily: 'monospace', minHeight: '2rem' }}
                />
                  <div className="hover:scale-110 transition-transform cursor-grab active:cursor-grabbing mt-1">
                    <GripVertical className="w-5 h-5 md:w-5 md:h-5 text-[var(--black)]" />
                  </div>
                  <button
                    onClick={() => deleteTask(task)}
                    className="hover:scale-110 transition-transform cursor-pointer mt-1"
                  >
                    <Trash2 className="w-5 h-5 md:w-5 md:h-5 text-[var(--black)]" />
                  </button>
                </>
              )}
              
             
              
             
            </div>
          ))}
          
          {isAdmin && (
            <div className="h-fit p-3 rounded-lg border-black border-3 bg-[var(--light-blue)] flex flex-row gap-x-2 items-start ">
              <textarea
                value={newTaskText}
                onInput={handleNewTaskInput}
                onKeyDown={handleNewTaskKeyDown}
                placeholder="Type out task (Shift+Enter for sub-items)"
                className="font-[body-font] text-sm flex-1 bg-transparent border-b-2 border-transparent outline-none resize-none whitespace-pre-wrap overflow-hidden"
                style={{ fontFamily: 'monospace', minHeight: '2rem' }}
              />
              
              <button
                onClick={createTask}
                className="bg-[var(--orange)] cursor-pointer hover:scale-102 transition-transform text-white px-4 rounded-md border-3 border-black font-[heading-font] text-lg md:text-xl"
              >
                add
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}