import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import reducer from "./reducer";
import saga from "./saga";
import PeopleList from "./PeopleList";

import { getPeople } from "containers/PeopleList/selectors";
import {
  updateEditedPerson,
  updatePerson,
  deletePerson
} from "../PeopleList/actions";

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
  handleDeletePersonOnClick: uuid => dispatch(deletePerson(uuid))
});

const mapStateToProps = createStructuredSelector({
  people: getPeople()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "people", reducer });
const withSaga = injectSaga({ key: "people", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(PeopleList);
export { mapDispatchToProps };
