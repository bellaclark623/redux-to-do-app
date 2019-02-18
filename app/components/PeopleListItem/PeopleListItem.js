/**
 * PeopleListItem
 *
 */

import React from "react";
import PropTypes from "prop-types";
import ListItem from "components/ListItem";
import "./style.scss";

export default class PeopleListItem extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  state = { editMode: false };

  toggleEditMode = () => {
    const { editMode } = this.state;

    this.setState({
      editMode: !editMode
    });
  };

  renderName() {
    const { item: person, handleEditedPersonNameOnChange } = this.props;
    const { editMode } = this.state;

    if (editMode) {
      return (
        <form>
          <input
            type="text"
            name="person.name"
            value={person.edited.name}
            onChange={event =>
              handleEditedPersonNameOnChange(event.target.value, person.uuid)
            }
          />
        </form>
      );
    }

    return <span>{person.name}</span>;
  }

  handleCancelButtonOnClick = () => {
    this.toggleEditMode();
  };

  handleEditButtonOnClick = () => {
    const { handleEditedPersonNameOnChange, item: person } = this.props;

    if (person.edited.name === "" || person.name !== person.edited.name) {
      handleEditedPersonNameOnChange(person.name, person.uuid);
    }

    this.toggleEditMode();
  };

  handleSaveOnClick = () => {
    const { handleEditedPersonOnSubmit, item: person } = this.props;

    this.toggleEditMode();
    handleEditedPersonOnSubmit(person.uuid);
  };

  handleDeleteButtonOnClick = () => {
    const { handleDeletePersonOnClick, item: person } = this.props;

    handleDeletePersonOnClick(person.uuid);
  };

  renderButtons() {
    const { editMode } = this.state;
    const { item: person } = this.props;

    const conditionalButtons = []; // create list of buttons that we will add

    if (editMode) {
      // push buttons to list conditionally
      conditionalButtons.push(
        <button
          key="save"
          onClick={this.handleSaveOnClick}
          disabled={person.edited.name.trim() === ""}
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
    const { item: person } = this.props;

    const content = (
      <div className="people-list-item">
        {this.renderName()}
        {this.renderButtons()}
      </div>
    );

    // Render the content into a list item
    return <ListItem key={person.uuid} item={content} />;
  }
}

PeopleListItem.propTypes = {
  item: PropTypes.object
};
