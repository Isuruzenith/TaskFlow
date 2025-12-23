import { create } from 'zustand';
import api from '@/lib/api';

interface Card {
    id: string;
    title: string;
    description: string;
    position: number;
}

interface TaskList {
    id: string;
    title: string;
    cards: Card[];
}

interface Board {
    id: string;
    title: string;
    ownerId: string;
    columns: TaskList[];
}

interface BoardState {
    activeBoard: Board | null;
    isLoading: boolean;
    error: string | null;

    fetchBoard: (id: string) => Promise<void>;
    createBoard: (title: string) => Promise<Board | null>;
    // For drag and drop updates (optimistic)
    setBoard: (board: Board) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
    activeBoard: null,
    isLoading: false,
    error: null,

    fetchBoard: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/boards/${id}`);
            set({ activeBoard: response.data, isLoading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch board', isLoading: false });
        }
    },

    createBoard: async (title) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/boards', { title });
            set({ isLoading: false });
            return response.data;
        } catch (err: any) {
            set({ error: err.message || 'Failed to create board', isLoading: false });
            return null;
        }
    },

    setBoard: (board) => set({ activeBoard: board }),
}));
