import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableCard } from './SortableCard';

interface ColumnProps {
    column: {
        id: string;
        title: string;
        cards: any[];
    };
}

export function SortableColumn({ column }: ColumnProps) {
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
            type: 'COLUMN',
            column,
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
                className="w-72 bg-gray-200/50 rounded-lg h-full border-2 border-indigo-500 border-dashed opacity-50 shrink-0"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="w-72 bg-gray-100 rounded-lg flex flex-col max-h-full shrink-0 shadow-sm border border-gray-200"
        >
            {/* Column Header */}
            <div
                {...attributes}
                {...listeners}
                className="p-3 font-semibold text-gray-700 flex justify-between cursor-grab active:cursor-grabbing border-b border-gray-100"
            >
                {column.title}
                <span className="text-gray-400 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                    {column.cards.length}
                </span>
            </div>

            {/* Cards Container */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                <SortableContext
                    items={column.cards.map(c => c.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {column.cards.map(card => (
                        <SortableCard key={card.id} card={card} />
                    ))}
                </SortableContext>
            </div>

            {/* Add Card Footer */}
            <div className="p-3 mt-auto">
                <button className="w-full py-1.5 rounded hover:bg-gray-200 text-gray-500 text-sm flex items-center justify-start px-2 transition-colors">
                    + Add a card
                </button>
            </div>
        </div>
    );
}
