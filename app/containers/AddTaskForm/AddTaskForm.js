import React, { Component } from "react";

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
        <select
          name="newTask.assignee"
          onChange={this.handleNewTaskAssigneeOnChange}
          value={assignee || -1}
        >
          <option value={-1} disabled>
            Select Assignee
          </option>
          {people.map(person => (
            <option value={person.uuid} key={person.uuid}>
              {person.name}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default AddTaskForm;
