import { fromJS } from "immutable";

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false
});

function appReducer(state = initialState, action) {
  // James Bond
  switch (action.type) {
    default:
      return state;
  }
}

export default appReducer;
