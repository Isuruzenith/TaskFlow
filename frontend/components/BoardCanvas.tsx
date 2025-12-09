'use client';
import { DndContext } from '@dnd-kit/core';
import Column from './Column';

export default function BoardCanvas({ initialBoard }: { initialBoard: any }) {
  return (
    <DndContext>
      <div className="flex gap-4 overflow-x-auto">
        {initialBoard.columns?.length ? (
          initialBoard.columns.map((col: any) => (
            <Column key={col.id} column={col} />
          ))
        ) : (
          <div className="text-sm text-gray-500">No columns</div>
        )}
      </div>
    </DndContext>
  );
}
