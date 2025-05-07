import React from "react";
import { useDroppable } from "@dnd-kit/core";

function Droppable({ id, droppedAnswer }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  // const [droppedAnswer, setDroppedAnswer] = React.useState(null);

  // React.useEffect(() => {
  //   if (droppableProps && droppableProps.activeId) {
  //     setDroppedAnswer(props.answer);
  //   }
  // }, [droppableProps]);

  return (
    <div ref={setNodeRef} style={style}>
      {droppedAnswer ? droppedAnswer : <div>Drop here</div>}
    </div>
  );
}

export default Droppable;
