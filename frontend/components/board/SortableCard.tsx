import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CardProps {
    card: {
        id: string;
        title: string;
        description?: string;
    };
}

export function SortableCard({ card }: CardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: card.id,
        data: {
            type: 'CARD',
            card,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-white p-3 rounded shadow-sm border border-gray-200 opacity-50 h-[60px]"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-3 rounded shadow-sm border border-gray-200 hover:border-indigo-400 cursor-grab active:cursor-grabbing group"
        >
            <h4 className="text-sm font-medium text-gray-800 group-hover:text-indigo-700 transition-colors">
                {card.title}
            </h4>
            {/* Optional: Show badges or icons here */}
        </div>
    );
}
