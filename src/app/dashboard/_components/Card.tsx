import { CardProps } from "@/app/_types/Card";
import { useRef } from "react";
import useDragItem from "../_hooks/dnd/useDragItem";
import useDropItem from "../_hooks/dnd/useDropItem";

export default function Card({ card, cardIndex, onDragCard }: CardProps) {
  const dragRef = useRef<HTMLDivElement>(null);

  const { isDragging, drag } = useDragItem("card", card.id, cardIndex);
  const { handlerId, drop } = useDropItem(dragRef, cardIndex, onDragCard);
  drag(drop(dragRef));

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      ref={dragRef}
      style={{ opacity }}
      data-handler-id={handlerId}
      className="flex flex-col font-medium min-h-14 w-full p-2 gap-2 bg-gray-300 rounded-lg dark:bg-slate-600 dark:text-white"
    >
      {card.title}
      {card.type === "template" && (
        <div className="text-xs text-gray-600 bg-sky-200 px-2 py-1 w-fit rounded-lg">
          This card is a Template
        </div>
      )}
    </div>
  );
}
