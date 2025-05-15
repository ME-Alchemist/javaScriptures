import React from "react";
import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";

const StyledDiv = styled.div`
  border: 2px solid black;
  height: 70px;
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

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
    <StyledDiv className="mx-auto m-3" ref={setNodeRef} style={style}>
      {droppedAnswer ? droppedAnswer : <div>Drop here</div>}
    </StyledDiv>
  );
}

export default Droppable;
