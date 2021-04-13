import React, { Fragment } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import { updateTasks } from "../redux/actions/tasks";
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 15px;
  padding: 8px;
  margin-right: 12px;
  margin-left: 12px;
  margin-bottom: 20px;
  background-color: ${(props) => (props.isdragging ? "#202124" : "#202124")};
  ${"" /* box-shadow: 3px 5px 5px lightgreen inset; */}
  box-shadow: 3px 5px lightgreen;
`;

class Task extends React.Component {
  handleCheckBox = () => {
    if (document.getElementById(this.props.task.id).checked) {
      let theTasks = { ...this.props.tasks };
      theTasks[this.props.task.id] = {
        ...theTasks[this.props.task.id],
        completed: true,
      };

      let newTaskIds1 = this.props.columns["column-1"].taskIds.filter(
        (taskItem) => taskItem !== this.props.task.id
      );

      let newTaskIds2 = [...this.props.columns["column-2"].taskIds];
      newTaskIds2.unshift(this.props.task.id);

      let newColumns = {
        "column-1": {
          id: "column-1",
          title: "To do",
          taskIds: newTaskIds1,
        },
        "column-2": {
          id: "column-2",
          title: "In progress",
          taskIds: newTaskIds2,
        },
      };
      this.props.updateTasks({
        tasks: theTasks,
        columns: newColumns,
      });
      console.log({
        theTasks,
        newColumns,
      });
    } else {
      let theTasks = { ...this.props.tasks };
      theTasks[this.props.task.id] = {
        ...theTasks[this.props.task.id],
        completed: false,
      };

      let newTaskIds1 = [...this.props.columns["column-1"].taskIds];
      newTaskIds1.unshift(this.props.task.id);

      let newTaskIds2 = this.props.columns["column-2"].taskIds.filter(
        (taskItem) => taskItem !== this.props.task.id
      );

      let newColumns = {
        "column-1": {
          id: "column-1",
          title: "To do",
          taskIds: newTaskIds1,
        },
        "column-2": {
          id: "column-2",
          title: "In progress",
          taskIds: newTaskIds2,
        },
      };
      this.props.updateTasks({
        tasks: theTasks,
        columns: newColumns,
      });
      console.log({
        theTasks,
        newColumns,
      });
    }
  };

  render() {
    console.log(this.props.task.completed, "completedcheck");
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isdragging={snapshot.isDragging}
          >
            <Fragment>
              <div className="title">{this.props.task.title}</div>
              <div className="descrip">{this.props.task.content}</div>
              {this.props.task.completed ? (
                <input
                  className="checkboxinput"
                  type="checkbox"
                  id={this.props.task.id}
                  name={this.props.task.id}
                  value={this.props.task.completed}
                  onChange={this.handleCheckBox}
                  checked
                />
              ) : (
                <input
                  className="checkboxinput"
                  type="checkbox"
                  id={this.props.task.id}
                  name={this.props.task.id}
                  value={this.props.task.completed}
                  onChange={this.handleCheckBox}
                />
              )}
              <label className="checkboxlabel" htmlFor={this.props.task.id}>
                Completed
              </label>
            </Fragment>
          </Container>
        )}
      </Draggable>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tasks: state.notes.tasks,
    columns: state.notes.columns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTasks: (notes) => dispatch(updateTasks(notes)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Task);

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
