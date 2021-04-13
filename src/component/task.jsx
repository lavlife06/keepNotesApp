import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isdragging ? "lightgreen" : "white")};
`;

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isdragging={snapshot.isDragging}
          >
            {this.props.task.title}
            {this.props.task.content}
            {this.props.task.completed ? "true" : "false"}
          </Container>
        )}
      </Draggable>
    );
  }
}
{
  /* <div
style={{
  borderWidth: "1px",
  borderRadius: "2px",
  borderStyle: "solid",
  borderColor: "lightgray",
  padding: "8px",
  backgroundColor: snapshot.isDragging ? "lightgreen" : "white",
}}
{...provided.draggableProps}
{...provided.dragHandleProps}
ref={provided.innerRef}
isDragging={snapshot.isDragging}
> */
}
