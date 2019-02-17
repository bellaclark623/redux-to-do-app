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

import {
  // LOAD_REPOS_SUCCESS,
  // LOAD_REPOS,
  // LOAD_REPOS_ERROR,
  UPDATE_EDITED_PERSON,
  UPDATE_EDITED_TASK,
  UPDATE_PERSON,
  DELETE_PERSON,
  UPDATE_TASK,
  DELETE_TASK
} from "./constants";

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
  ],
  tasks: [
    {
      uuid: "50aad248-516f-4d42-9ff5-20c9fa248287",
      label: "Task 1",
      assignee: "",
      createdOn: 1,
      completed: true,
      edited: {
        label: "",
        assignee: ""
      }
    },
    {
      uuid: "6f594bb4-0e6b-40d8-bddd-832b6de2bfad",
      label: "Task 2",
      assignee: "31be11a2-5dbc-4ff1-8773-9e2462e96ec0",
      createdOn: 2,
      completed: false,
      edited: {
        label: "",
        assignee: ""
      }
    },
    {
      uuid: "cfd72878-f731-4f77-a427-810a6a6d2ffb",
      label: "Task 2",
      assignee: "31be11a2-5dbc-4ff1-8773-9e2462e96ec0",
      createdOn: 2,
      completed: false,
      edited: {
        label: "",
        assignee: ""
      }
    },
    {
      uuid: "565f1f92-21a1-4e16-8d55-d05184e5bf2b",
      label: "Task 2",
      assignee: "31be11a2-5dbc-4ff1-8773-9e2462e96ec0",
      createdOn: 2,
      completed: true,
      edited: {
        label: "",
        assignee: ""
      }
    },
    {
      uuid: "3adb26aa-d335-4a15-981e-d17f0cd27559",
      label: "Task 2",
      assignee: "31be11a2-5dbc-4ff1-8773-9e2462e96ec0",
      createdOn: 2,
      completed: false,
      edited: {
        label: "",
        assignee: ""
      }
    },
    {
      uuid: "79be1f61-e941-4d77-9634-3177949265aa",
      label: "Task 2",
      assignee: "31be11a2-5dbc-4ff1-8773-9e2462e96ec0",
      createdOn: 2,
      completed: false,
      edited: {
        label: "",
        assignee: ""
      }
    }
  ]
});

function appReducer(state = initialState, action) {
  // James Bond
  switch (action.type) {
    case UPDATE_EDITED_PERSON: {
      const {
        payload: { uuid: personToUpdateUuid, edited }
      } = action;

      const people = state.get("people");

      const updatedPeople = people.update(
        people.findIndex(function(item) {
          return item.get("uuid") === personToUpdateUuid; // find the person in the List you want to update
        }),
        function(item) {
          return item.set("edited", edited); // update their edited.name data
        }
      );

      return state
        .set("loading", false)
        .set("error", false)
        .set("people", updatedPeople);
    }
    case UPDATE_EDITED_TASK: {
      const {
        payload: { uuid: taskToUpdateUuid, edited }
      } = action;

      const tasks = state.get("tasks");

      const updatedTasks = tasks.update(
        tasks.findIndex(function(item) {
          return item.get("uuid") === taskToUpdateUuid; // find the person in the List you want to update
        }),
        function(item) {
          return item.set("edited", edited); // update their edited.name data
        }
      );

      return state
        .set("loading", false)
        .set("error", false)
        .set("tasks", updatedTasks);
    }
    case UPDATE_PERSON: {
      const {
        payload: { uuid: personToUpdateUuid }
      } = action;

      const people = state.get("people");

      const updatedPeople = people.update(
        people.findIndex(function(item) {
          return item.get("uuid") === personToUpdateUuid; // find the person in the List you want to update
        }),
        function(item) {
          const editedPerson = item.toJS().edited;
          const personUpdatedByEditedPerson = item.merge(editedPerson); // update their edited.name data

          return personUpdatedByEditedPerson;
        }
      );

      return state
        .set("loading", false)
        .set("error", false)
        .set("people", updatedPeople);
    }

    case UPDATE_TASK: {
      const {
        payload: { uuid: taskToUpdateUuid }
      } = action;

      const tasks = state.get("tasks");

      const updatedTasks = tasks.update(
        tasks.findIndex(function(item) {
          return item.get("uuid") === taskToUpdateUuid; // find the person in the List you want to update
        }),
        function(item) {
          const editedTask = item.toJS().edited;
          const taskUpdatedByEditedTask = item.merge(editedTask); // update their edited.name data

          return taskUpdatedByEditedTask;
        }
      );

      return state
        .set("loading", false)
        .set("error", false)
        .set("tasks", updatedTasks);
    }

    case DELETE_PERSON: {
      const {
        payload: { uuid: personToDeleteUuid }
      } = action; // const personToDeleteUuid = action.payload.uuid

      const people = state.get("people");

      const didFindPerson = people.find(function(person) {
        return person.get("uuid") === personToDeleteUuid;
      });

      if (didFindPerson) {
        const remainingPeople = people.filter(function(person) {
          return person.get("uuid") !== personToDeleteUuid;
        });

        return state
          .set("loading", false)
          .set("error", false)
          .set("people", remainingPeople);
      }
    }

    case DELETE_TASK: {
      const {
        payload: { uuid: taskToDeleteUuid }
      } = action; // const taskToDeleteUuid = action.payload.uuid

      const tasks = state.get("tasks");

      const didFindTask = tasks.find(function(task) {
        return task.get("uuid") === taskToDeleteUuid;
      });

      if (didFindTask) {
        const remainingTasks = tasks.filter(function(task) {
          return task.get("uuid") !== taskToDeleteUuid;
        });

        return state
          .set("loading", false)
          .set("error", false)
          .set("tasks", remainingTasks);
      }
    }
    // case LOAD_REPOS:
    //   return state
    //     .set("loading", true)
    //     .set("error", false)
    //     .setIn(["userData", "repositories"], false);
    // case LOAD_REPOS_SUCCESS:
    //   return state
    //     .setIn(["userData", "repositories"], action.repos)
    //     .set("loading", false)
    //     .set("currentUser", action.username);
    // case LOAD_REPOS_ERROR:
    //   return state.set("error", action.error).set("loading", false);
    default:
      return state;
  }
}

export default appReducer;
