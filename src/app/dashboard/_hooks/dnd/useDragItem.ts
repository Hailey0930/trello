import { useDrag } from "react-dnd";

export interface DragItem {
  id: string;
  index: number;
}

export default function useDragItem(type: string, id: string, index: number) {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: (): DragItem => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return { isDragging, drag };
}
