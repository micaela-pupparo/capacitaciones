import React, { memo, useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    id: number;
    children: React.ReactNode
}

const SortableItem = ({ id, children }: Props) => {
  console.log('id del sortable', id);
  console.log('children del sortable', children);
  
  
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

    const style = useMemo(
      () => ({
        // Si transform y transition son undefined, devuelve un objeto vacío
        ...(transform || transition
          ? {
              transform: CSS.Transform.toString(transform),
              transition,
            }
          : {}),
      }),
      [transform, transition]
    );

    console.log('estilos transition ', transition, 'y transform ', transform);
    

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default memo(SortableItem, (prevProps, nextProps) => prevProps.id === nextProps.id);