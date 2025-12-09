'use client';
import TaskCard from './TaskCard';

export default function Column({ column }: { column: any }) {
  return (
    <div className="w-80 shrink-0 rounded bg-gray-100 p-3 dark:bg-gray-800">
      <h2 className="mb-2 text-sm font-semibold">{column.title ?? 'Column'}</h2>
      <div className="space-y-2">
        {(column.tasks ?? []).map((t: any) => (
          <TaskCard key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}
