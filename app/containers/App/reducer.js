/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from "immutable";

import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from "./constants";

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  people: [
    {
      uuid: "686e46b6-2f77-468e-8488-37d526cfd727",
      name: "Jon",
      createdOn: 1,
      edited: {
        name: ""
      }
    },
    {
      uuid: "31be11a2-5dbc-4ff1-8773-9e2462e96ec0",
      name: "Mike",
      createdOn: 2,
      edited: {
        name: ""
      }
    },
    {
      uuid: "723f0b9d-1b7f-44d5-91a7-0dd0a7945672",
      name: "Maya",
      createdOn: 3,
      edited: {
        name: ""
      }
    }
  ]
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set("loading", true)
        .set("error", false)
        .setIn(["userData", "repositories"], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(["userData", "repositories"], action.repos)
        .set("loading", false)
        .set("currentUser", action.username);
    case LOAD_REPOS_ERROR:
      return state.set("error", action.error).set("loading", false);
    default:
      return state;
  }
}

export default appReducer;
