import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import { makeSelectLoading, makeSelectError } from "containers/App/selectors";

import reducer from "./reducer";
import saga from "./saga";
import HomePage from "./HomePage";

const mapDispatchToProps = () => ({});

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "global", reducer });
const withSaga = injectSaga({ key: "global", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage);
export { mapDispatchToProps };
