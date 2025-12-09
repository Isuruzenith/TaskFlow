import { BoardCanvas } from "@/components/BoardCanvas";

export default function BoardPage({ params }: { params: { id: string } }) {
    // In a real app, we would fetch the board data here using params.id
    // and pass it to BoardCanvas.
    // For now, BoardCanvas uses mocked data.

    return <BoardCanvas />;
}
