import { MutableRefObject } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { DragItem } from "./useDragItem";

export default function useDropItem(
  dragRef: MutableRefObject<HTMLDivElement | null>,
  index: number,
  onDragHandler: (dragIndex: number, hoverIndex: number) => void,
) {
  const [{ handlerId }, drop] = useDrop({
    accept: "category",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!dragRef.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = dragRef.current?.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      onDragHandler(dragIndex, hoverIndex);
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  return { handlerId, drop };
}
