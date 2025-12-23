"use client";

import React, { useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Task, TaskCard } from "./TaskCard";

export type ColumnType = {
  id: string | number;
  title: string;
};

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

export function Column({ column, tasks }: ColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
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
        className="glass-panel min-w-[300px] h-[500px] opacity-40 border-2 border-angelic-pink"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="glass-panel min-w-[300px] p-4 flex flex-col gap-4"
    >
      {/* Column Header */}
      <div
        className="flex justify-between items-center px-2 cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <h2 className="text-lg font-bold text-gray-700">{column.title}</h2>
        <span className="bg-angelic-teal/20 text-angelic-text text-xs px-2 py-1 rounded-full font-bold">
          {tasks.length}
        </span>
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-4 flex-grow">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>

      {/* "Add New" Button */}
      <button className="w-full py-2 rounded-xl border-2 border-dashed border-white/50 text-angelic-text/80 hover:bg-white/20 transition-colors text-sm font-medium">
        + Add Card
      </button>
    </div>
  );
}
