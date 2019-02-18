import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import AddPersonForm from "./AddPersonForm";

import {
  addPerson // TODO: add action and constant
} from "./actions";

const mapDispatchToProps = dispatch => ({
  handleAddPersonOnSubmit: newPerson => dispatch(addPerson(newPerson))
});

const mapStateToProps = createStructuredSelector({
  // none
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(AddPersonForm);

export { mapDispatchToProps };
