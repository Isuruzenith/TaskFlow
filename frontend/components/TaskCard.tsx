"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

export type Task = {
  id: string | number;
  title: string;
  tag: string;
  color: string; // e.g., 'bg-angelic-pink'
  columnId: string | number;
};

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "glass-card p-4 rounded-2xl opacity-50 ring-2 ring-angelic-pink shadow-angelic-pink/50 h-[100px]",
        )}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "glass-card p-4 cursor-grab active:cursor-grabbing group hover:ring-2 hover:ring-white/50",
      )}
    >
      {/* Tag / Label */}
      <div
        className={cn(
          "w-fit px-3 py-1 rounded-full text-xs font-bold text-white mb-2 shadow-sm",
          task.color,
        )}
      >
        {task.tag}
      </div>

      <h3 className="angelic-text font-semibold text-sm mb-2">{task.title}</h3>

      {/* Footer Icons (Simulated) */}
      <div className="flex justify-between items-center mt-3 border-t border-gray-100/50 pt-2 opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-angelic-yellow border-2 border-white"></div>
        </div>
        <span className="text-xs text-gray-500">Dec 12</span>
      </div>
    </div>
  );
}
