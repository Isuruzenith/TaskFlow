'use client';
import { useState } from 'react';

export default function NewTaskForm({ onCreate }: { onCreate: (title: string) => void }) {
  const [title, setTitle] = useState('');
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (title.trim()) onCreate(title.trim());
        setTitle('');
      }}
    >
      <input
        className="flex-1 rounded border px-2 py-1"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="rounded bg-blue-600 px-3 py-1 text-white">Add</button>
    </form>
  );
}
