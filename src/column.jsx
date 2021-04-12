import React from "react";
import { Container } from "semantic-ui-react";
import Task from "./task";
import { Droppable } from "react-beautiful-dnd";

let styles = {
  Container: {
    margin: "8px",
    border: "1px solid lightgrey",
    borderRadius: "2px",
  },
  Task: {
    padding: "8px",
  },
  TaskList: {
    padding: "8px",
  },
};
const Column = ({ tasks, column }) => {
  return (
    <Container style={styles.Container}>
      <h3 style={styles.Task}>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            style={styles.TaskList}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
