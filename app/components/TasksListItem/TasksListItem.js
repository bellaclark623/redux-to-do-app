/**
 * TasksListItem
 *
 */

import React from "react";
import PropTypes from "prop-types";
import ListItem from "components/ListItem";
import "./style.scss";
import { select } from "redux-saga/effects";

export default class TasksListItem extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  state = { editMode: false };

  toggleEditMode = () => {
    const { editMode } = this.state;

    this.setState({
      editMode: !editMode
    });
  };

  getPersonNameByUuid(uuid) {
    // uuid
    const { people } = this.props;
    const foundPeople = people.filter(person => person.uuid === uuid);
    return (foundPeople.length ? foundPeople : [{}])[0].name;
  }

  renderName() {
    const {
      item: task,
      handleEditedTaskLabelOnChange,
      people,
      handleEditedTaskAssigneeOnChange
    } = this.props;
    const { editMode } = this.state;

    if (editMode) {
      console.log(task);

      return (
        <form>
          <input
            type="text"
            name="editedTask.edit.label"
            value={task.edited.label}
            onChange={event =>
              handleEditedTaskLabelOnChange(event.target.value, task.uuid)
            }
          />
          <select
            value={task.edited.assignee || -1}
            onChange={event =>
              handleEditedTaskAssigneeOnChange(event.target.value, task.uuid)
            }
          >
            <option value="-1" disabled>
              Select an Assignee
            </option>
            {people.map(person => (
              <option
                name="task.edited.assignee"
                value={person.uuid}
                key={person.uuid}
              >
                {person.name}
              </option>
            ))}
          </select>
        </form>
      );
    }

    return (
      <span>
        {task.label}
        {task.assignee
          ? ` - ${this.getPersonNameByUuid(task.assignee)}`
          : null}{" "}
      </span>
    );
  }

  handleCancelButtonOnClick = () => {
    this.toggleEditMode();
  };

  handleEditButtonOnClick = () => {
    const {
      handleEditedTaskLabelOnChange,
      handleEditedTaskAssigneeOnChange,
      item: task
    } = this.props;

    if (task.edited.label === "" || task.label !== task.edited.label) {
      handleEditedTaskLabelOnChange(task.label, task.uuid);
      handleEditedTaskAssigneeOnChange(task.assignee, task.uuid);
    }

    this.toggleEditMode();
  };

  handleSaveOnClick = () => {
    const { handleEditedTaskOnSubmit, item: task } = this.props;

    this.toggleEditMode();
    handleEditedTaskOnSubmit(task.uuid);
  };

  handleDeleteButtonOnClick = () => {
    const { handleDeleteTaskOnClick, item: task } = this.props;

    handleDeleteTaskOnClick(task.uuid);
  };

  renderButtons() {
    const { editMode } = this.state;

    const conditionalButtons = []; // create list of buttons that we will add

    if (editMode) {
      // push buttons to list conditionally
      conditionalButtons.push(
        <button key="save" onClick={this.handleSaveOnClick}>
          Save
        </button>
      );

      conditionalButtons.push(
        <button key="cancel" onClick={this.handleCancelButtonOnClick}>
          Cancel
        </button>
      );
    } else {
      conditionalButtons.push(
        <button key="edit" onClick={this.handleEditButtonOnClick}>
          Edit
        </button>
      );

      conditionalButtons.push(
        <button key="delete" onClick={this.handleDeleteButtonOnClick}>
          Delete
        </button>
      );
    }

    return <div className="buttons-wrapper">{conditionalButtons}</div>;
  }

  render() {
    const { item: task } = this.props;

    const content = (
      <div className="people-list-item">
        {this.renderName()}
        {this.renderButtons()}
      </div>
    );

    // Render the content into a list item
    return <ListItem key={task.uuid} item={content} />;
  }
}

TasksListItem.propTypes = {
  item: PropTypes.object
};
