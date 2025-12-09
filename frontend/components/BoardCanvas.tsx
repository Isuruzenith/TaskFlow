"use client";

import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Column, ColumnType } from "./Column";
import { TaskCard, Task } from "./TaskCard";

const defaultCols: ColumnType[] = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const defaultTasks: Task[] = [
  { id: "1", columnId: "todo", title: "Database Schema", tag: "Backend", color: "bg-angelic-purple" },
  { id: "2", columnId: "todo", title: "Glass UI Design", tag: "Frontend", color: "bg-angelic-pink" },
  { id: "3", columnId: "inprogress", title: "Auth Integration", tag: "Security", color: "bg-angelic-teal" },
  { id: "4", columnId: "done", title: "Project Setup", tag: "DevOps", color: "bg-angelic-yellow" },
];

export function BoardCanvas() {
  const [columns, setColumns] = useState<ColumnType[]>(defaultCols);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px movement before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveColumn = active.data.current?.type === "Column";
    if (isActiveColumn) {
      setColumns((columns) => {
        const activeIndex = columns.findIndex((col) => col.id === activeId);
        const overIndex = columns.findIndex((col) => col.id === overId);
        return arrayMove(columns, activeIndex, overIndex);
      });
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    const isOverColumn = over.data.current?.type === "Column";

    if (!isActiveTask) return;

    // Dropping a Task over another Task
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // Dropping a Task over a Column
    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex); // move to same index, just trigger re-render
      });
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#FDF6F6] p-10 font-sans"
      style={{
        backgroundImage: "var(--image-angelic-mesh)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
      }}>
      <h1 className="text-4xl font-bold text-white drop-shadow-md mb-8 tracking-tight">
        Project <span className="italic font-light">Angelic</span>
      </h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex gap-6 overflow-x-auto pb-4 items-start h-full">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <Column
                key={col.id}
                column={col}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <Column
                column={activeColumn}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              />
            )}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
