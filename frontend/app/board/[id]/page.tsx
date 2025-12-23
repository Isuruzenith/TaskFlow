'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useBoardStore } from '@/store/useBoardStore';
import { Loader2 } from 'lucide-react';
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
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import AuthGuard from '@/components/auth/AuthGuard';

// Components (We will define these inline for MVP simplicity, then extract)
import { SortableColumn } from '@/components/board/SortableColumn';
import { SortableCard } from '@/components/board/SortableCard';

export default function BoardPage() {
    const params = useParams();
    const id = params.id as string;
    const { activeBoard, fetchBoard, isLoading, error } = useBoardStore();

    // Dnd Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Require 5px movement to start drag (prevents accidental clicks)
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const [activeDragId, setActiveDragId] = useState<string | null>(null);
    const [activeDragType, setActiveDragType] = useState<'COLUMN' | 'CARD' | null>(null);

    useEffect(() => {
        if (id) {
            fetchBoard(id);
        }
    }, [id, fetchBoard]);

    if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
    if (error) return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
    if (!activeBoard) return null;

    // -- Drag Handlers --

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveDragId(active.id as string);

        const isColumn = active.data.current?.type === 'COLUMN';
        setActiveDragType(isColumn ? 'COLUMN' : 'CARD');
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveDragId(null);
        setActiveDragType(null);
        // Logic to persist reordering would go here
        // For MVP, we primarily demonstrate the UI interaction
    };

    return (
        <AuthGuard>
            <div className="h-screen flex flex-col bg-blue-50">
                <header className="bg-white shadow px-4 py-3 flex items-center justify-between z-10">
                    <h1 className="text-xl font-bold text-gray-800">{activeBoard.title}</h1>
                    {/* Add "Add List" button here */}
                </header>

                <main className="flex-1 overflow-x-auto overflow-y-hidden p-4">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="flex h-full gap-4">
                            <SortableContext
                                items={activeBoard.columns.map(col => col.id)}
                                strategy={horizontalListSortingStrategy}
                            >
                                {activeBoard.columns.map(col => (
                                    <SortableColumn key={col.id} column={col} />
                                ))}
                            </SortableContext>
                        </div>

                        {/* Drag Overlay for smooth visuals */}
                        <DragOverlay>
                            {activeDragId ? (
                                activeDragType === 'COLUMN' ? (
                                    <div className="w-72 bg-gray-100 rounded-lg shadow-xl p-4 opacity-80 h-full border-2 border-indigo-500">
                                        {/* Placeholder for dragging column */}
                                        Column Dragging
                                    </div>
                                ) : (
                                    <div className="bg-white p-3 rounded shadow-lg border-2 border-indigo-500 w-full">
                                        {/* Placeholder for dragging card */}
                                        Card Dragging
                                    </div>
                                )
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </main>
            </div>
        </AuthGuard>
    );
}
