import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import reducer from "./reducer";
import saga from "./saga";
import TasksList from "./TasksList";

import { getTasks } from "containers/TasksList/selectors";
import { updateTask, deleteTask, updateEditedTask } from "../TasksList/actions";

const mapDispatchToProps = dispatch => ({
  handleEditedTaskOnSubmit: uuid => dispatch(updateTask(uuid)),
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
  tasks: getTasks()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "tasks", reducer });
const withSaga = injectSaga({ key: "tasks", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(TasksList);
export { mapDispatchToProps };
