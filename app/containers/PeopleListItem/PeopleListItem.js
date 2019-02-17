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
    const {
      item: person,
      handleEditedPersonNameOnChange
      // handleEditedPersonOnSubmit
    } = this.props;
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

  renderButtons() {
    const { editMode } = this.state;

    const conditionalButtons = []; // create list of buttons that we will add

    if (editMode) {
      // push buttons to list conditionally
      conditionalButtons.push(
        <button
          key="save"
          // onClick={handleEditedPersonOnSubmit}
        >
          Save
        </button>
      );
    } else {
      conditionalButtons.push(<button key="delete">Delete</button>);
    }

    return (
      <div className="buttons-wrapper">
        <button onClick={this.toggleEditMode}>
          {this.state.editMode ? "Cancel" : "Edit"}
        </button>
        {conditionalButtons}
      </div>
    );
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
