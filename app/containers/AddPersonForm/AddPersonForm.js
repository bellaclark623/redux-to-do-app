import React, { Component } from "react";

export class AddPersonForm extends Component {
  state = {
    uuid: false,
    name: "",
    createdOn: false
  };

  handlePersonNameOnChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleAddPersonOnSubmit = e => {
    e.preventDefault();
    const { handleAddPersonOnSubmit } = this.props;
    handleAddPersonOnSubmit(this.state);
    this.setState({
      name: ""
    })
  };

  render() {
    const { name } = this.state;
    return (
      <form onSubmit={this.handleAddPersonOnSubmit}>
        <input
          type="text"
          name="newPerson.name"
          value={name}
          onChange={this.handlePersonNameOnChange}
        />
        &nbsp;
        <button type="submit" disabled={name.trim() === ""}>
          Submit
        </button>
      </form>
    );
  }
}

export default AddPersonForm;
