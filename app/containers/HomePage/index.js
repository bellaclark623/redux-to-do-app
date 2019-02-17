import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import {
  makeSelectLoading,
  makeSelectError,
  getPeople,
  getTasks
} from "containers/App/selectors";
import {
  updateEditedPerson,
  updatePerson,
  updateTask,
  deletePerson,
  deleteTask,
  updateEditedTask
} from "../App/actions";
// import { changeUsername } from "./actions";
import { makeSelectUsername } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import HomePage from "./HomePage";

const mapDispatchToProps = dispatch => ({
  handleEditedPersonNameOnChange: (editedName, uuid) =>
    dispatch(
      updateEditedPerson(
        {
          name: editedName
        },
        uuid
      )
    ),
  handleEditedPersonOnSubmit: uuid => dispatch(updatePerson(uuid)),
  handleEditedTaskOnSubmit: uuid => dispatch(updateTask(uuid)),
  handleDeletePersonOnClick: uuid => dispatch(deletePerson(uuid)),
  handleDeleteTaskOnClick: uuid => dispatch(deleteTask(uuid)),
  handleEditedTaskLabelOnChange: (editedLabel, uuid) =>
    dispatch(
      updateEditedTask(
        {
          label: editedLabel
        },
        uuid
      )
    )
});

const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  people: getPeople(),
  tasks: getTasks(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "home", reducer });
const withSaga = injectSaga({ key: "home", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage);
export { mapDispatchToProps };
