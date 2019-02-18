/**
 * TasksListItem
 *
 */

import React from "react";
import PropTypes from "prop-types";
import ListItem from "components/ListItem";
import PeopleSelect from "components/PeopleSelect";
import "./style.scss";

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
    return (foundPeople.length ? foundPeople : [{}])[0].name || false;
  }

  renderName() {
    const {
      item: task,
      handleEditedTaskLabelOnChange,
      people,
      handleEditedTaskAssigneeOnChange,
      handleTaskCompletedOnChange
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
          <PeopleSelect
            onChange={e =>
              handleEditedTaskAssigneeOnChange(e.target.value, task.uuid)
            }
            items={people}
            value={task.edited.assignee || -1}
          />
        </form>
      );
    }

    return (
      <span>
        <input
          type="checkbox"
          value={task.completed}
          onChange={() => handleTaskCompletedOnChange(task.uuid)}
        />
        &nbsp;
        {task.label}
        {task.assignee && this.getPersonNameByUuid(task.assignee)
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
    const { item: task } = this.props;
    const { editMode } = this.state;

    const conditionalButtons = []; // create list of buttons that we will add

    if (editMode) {
      // push buttons to list conditionally
      conditionalButtons.push(
        <button
          key="save"
          onClick={this.handleSaveOnClick}
          disabled={task.edited.label.trim() === ""}
        >
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
