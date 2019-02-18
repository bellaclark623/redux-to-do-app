import React, { Component } from "react";
import PeopleSelect from "../../components/PeopleSelect";

export class AddTaskForm extends Component {
  state = {
    uuid: false,
    label: "",
    assignee: "",
    createdOn: false
  };

  handleNewTaskLabelOnChange = e => {
    this.setState({
      label: e.target.value
    });
  };

  handleNewTaskAssigneeOnChange = e => {
    this.setState({
      assignee: e.target.value
    });
  };

  handleAddTaskOnSubmit = e => {
    e.preventDefault();
    this;
    console.log("TCL: AddTaskForm -> this", this);
    const { handleAddTaskOnSubmit } = this.props;
    handleAddTaskOnSubmit(this.state);
  };

  render() {
    const { people } = this.props;
    const { label, assignee } = this.state;
    return (
      <form onSubmit={this.handleAddTaskOnSubmit}>
        <input
          type="text"
          name="newTask.label"
          value={label}
          onChange={this.handleNewTaskLabelOnChange}
        />
        <PeopleSelect
          onChange={this.handleNewTaskAssigneeOnChange}
          items={people}
          value={assignee || -1}
        />
        <button type="submit" disabled={label.trim() === ""}>
          Submit
        </button>
      </form>
    );
  }
}

export default AddTaskForm;
