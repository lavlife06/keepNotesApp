import React, { Fragment } from "react";
// import '@atlaskit/css-reset';
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./component/column";
import "./App.css";
import { connect } from "react-redux";

import { updateNotes, clearNotes } from "./redux/actions/notes";
class App extends React.Component {
  state = {
    notes: false,
    formdata: {
      title: "",
      description: "",
    },
    loading: true,
  };

  componentDidMount() {
    if (this.props.tasks) {
      this.setState({
        loading: false,
      });
    }
  }

  onChangeHandler = (e) => {
    this.setState({
      formdata: { ...this.state.formdata, [e.target.name]: e.target.value },
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    let theTaskId =
      "task-" + (Object.keys(this.props.tasks).length + 1).toString();

    let theTasks = { ...this.props.tasks };
    theTasks[theTaskId] = {
      id: theTaskId,
      content: this.state.formdata.description,
      title: this.state.formdata.title,
      completed: false,
    };

    // console.log(theTasks);

    this.props.updateNotes({
      tasks: theTasks,
      columns: {
        ...this.props.columns,
        "column-1": {
          ...this.props.columns["column-1"],
          taskIds: [...this.props.columns["column-1"].taskIds, theTaskId],
        },
      },
    });

    this.setState({
      formdata: {
        title: "",
        description: "",
      },
    });
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.props.columns[source.droppableId];
    const finish = this.props.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      this.props.updateNotes({
        tasks: this.props.tasks,
        columns: {
          ...this.props.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    this.props.updateNotes({
      tasks: this.props.tasks,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  render() {
    console.log(this.state.loading);
    console.log(this.props);
    if (this.state.loading) {
      return <div>Loading....</div>;
    }
    let { title, description } = this.state.formdata;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="mainContainer">
          <header>
            <div>NotesApp</div>
            <div>Search your notes...</div>
          </header>
          {/* <div onClick={() => {}}>Create list</div> */}
          <form
            className="form"
            action="create-task.html"
            onSubmit={(e) => this.onSubmitHandler(e)}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="Title..."
                name="title"
                value={title}
                onChange={(e) => this.onChangeHandler(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Description..."
                name="description"
                value={description}
                onChange={(e) => this.onChangeHandler(e)}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Create" />
          </form>
          <section>
            {this.props.columnOrder.map((columnId) => {
              const column = this.props.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId) => this.props.tasks[taskId]
              );
              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </section>
        </div>
      </DragDropContext>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tasks: state.notes.tasks,
    columns: state.notes.columns,
    columnOrder: state.notes.columnOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNotes: (notes) => dispatch(updateNotes(notes)),
    clearNotes: () => dispatch(clearNotes()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
