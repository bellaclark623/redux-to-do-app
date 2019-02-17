import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import {
  makeSelectLoading,
  makeSelectError,
  getPeople
} from "containers/App/selectors";
import { updateEditedPerson, updatePerson } from "../App/actions";
// import { changeUsername } from "./actions";
import { makeSelectUsername } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import HomePage from "./HomePage";

const mapDispatchToProps = dispatch => ({
  // onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
  // onSubmitForm: evt => {
  //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
  //   dispatch(loadRepos());
  // }
  handleEditedPersonNameOnChange: (editedName, uuid) =>
    dispatch(
      updateEditedPerson(
        {
          name: editedName
        },
        uuid
      )
    ),
  handleEditedPersonOnSubmit: uuid => {
    dispatch(updatePerson(uuid));
  }
});

const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  people: getPeople(),
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
