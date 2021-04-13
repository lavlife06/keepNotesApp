import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";
import "./components.css";

export default class Column extends React.Component {
  render() {
    return (
      <div className="columnContainer">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ margin: "12px 8px 12px 8px" }}>
            {this.props.column.title}
          </div>
          <div style={{ margin: "12px 8px 12px 8px" }}>
            {this.props.column.taskIds.length}
          </div>
        </div>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div
              style={{
                padding: "8px",
                transition: "background-color 0.2s ease",
                backgroundColor: snapshot.isDraggingOver ? "skyblue" : "white",
                flexGrow: 1,
                minHeight: "100px",
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
              // isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
