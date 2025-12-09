'use client';

export default function TaskCard({ task }: { task: any }) {
  return (
    <div className="rounded border border-gray-300 bg-white p-2 text-sm shadow-sm dark:bg-gray-700">
      <div className="font-medium">{task.title ?? 'Task'}</div>
      {task.description && (
        <div className="text-xs text-gray-600 dark:text-gray-300">{task.description}</div>
      )}
    </div>
  );
}
