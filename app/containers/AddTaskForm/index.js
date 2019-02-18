import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import AddTaskForm from "./AddTaskForm";

import {
  addTask // TODO: add action and constant
} from "./actions";
import { getPeople } from "../PeopleList/selectors";

const mapDispatchToProps = dispatch => ({
  handleAddTaskOnSubmit: newTask => dispatch(addTask(newTask))
});

const mapStateToProps = createStructuredSelector({
  // none
  people: getPeople()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(AddTaskForm);

export { mapDispatchToProps };
