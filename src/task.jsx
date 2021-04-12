import React from "react";
import { Container } from "semantic-ui-react";
import { Draggable } from "react-beautiful-dnd";

let styles = {
  Container: {
    border: "5px solid lightgrey",
    borderRadius: "2px",
    padding: "8px",
    marginBottom: "8px",
    backgroundColor: "white",
  },
};

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Container
          style={styles.Container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
