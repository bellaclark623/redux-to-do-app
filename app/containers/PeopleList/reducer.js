import { fromJS } from "immutable";
import uuid from "uuid/v4";

import {
  UPDATE_EDITED_PERSON,
  UPDATE_PERSON,
  DELETE_PERSON,
  ADD_PERSON
} from "./constants";

// The initial state of the App
const initialState = fromJS({
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

function peopleListReducer(state = initialState, action) {
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

      return state.set("people", updatedPeople);
    }

    case ADD_PERSON: {
      const {
        payload: { newPerson }
      } = action;

      const preparedNewPerson = { ...newPerson };

      preparedNewPerson.uuid = uuid();

      preparedNewPerson.createdOn = Date.now();

      preparedNewPerson.edited = {
        name: ""
      };

      const updatedPeople = state.update("people", peopleList =>
        peopleList.push(fromJS(preparedNewPerson))
      );

      return state.merge(updatedPeople);
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

    default:
      return state;
  }
}

export default peopleListReducer;
