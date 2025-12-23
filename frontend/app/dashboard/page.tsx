'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { useBoardStore } from '@/store/useBoardStore';
import { Loader2, Plus, Layout } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BoardSummary {
    id: string;
    title: string;
}

export default function DashboardPage() {
    const [boards, setBoards] = useState<BoardSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState('');

    const createBoard = useBoardStore((state) => state.createBoard);
    const router = useRouter();

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            const response = await api.get('/boards');
            setBoards(response.data);
        } catch (error) {
            console.error('Failed to fetch boards', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBoard = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBoardTitle.trim()) return;

        const newBoard = await createBoard(newBoardTitle);
        if (newBoard) {
            setBoards([...boards, newBoard]);
            setCreateModalOpen(false);
            setNewBoardTitle('');
            router.push(`/board/${newBoard.id}`);
        }
    };

    if (loading) {
        return <div className="flex justify-center py-10"><Loader2 className="animate-spin text-indigo-600" /></div>;
    }

    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Your Boards</h1>
                <button
                    onClick={() => setCreateModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Board
                </button>
            </div>

            {boards.length === 0 ? (
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-64 flex flex-col items-center justify-center text-center p-6">
                    <Layout className="w-12 h-12 text-gray-400 mb-4" />
                    <h2 className="text-lg font-medium text-gray-900">No boards created yet</h2>
                    <p className="mt-1 text-sm text-gray-500 mb-4">Get started by creating a new board to organize your tasks.</p>
                    <button
                        onClick={() => setCreateModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Create Board
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {boards.map((board) => (
                        <Link href={`/board/${board.id}`} key={board.id} className="block group">
                            <div className="h-32 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between group-hover:border-indigo-300">
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 truncate">
                                    {board.title}
                                </h3>
                                <div className="text-xs text-gray-400">
                                    View Board &rarr;
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Simple Modal for Create Board */}
            {createModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <h3 className="text-lg font-bold mb-4">Create New Board</h3>
                        <form onSubmit={handleCreateBoard}>
                            <input
                                type="text"
                                value={newBoardTitle}
                                onChange={(e) => setNewBoardTitle(e.target.value)}
                                placeholder="Board Title (e.g., Marketing Project)"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                autoFocus
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setCreateModalOpen(false)}
                                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
