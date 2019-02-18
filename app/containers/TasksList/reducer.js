import { fromJS } from "immutable";
import uuid from "uuid/v4";

import {
  UPDATE_EDITED_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  ADD_TASK,
  REMOVE_ASSIGNEE_FROM_TASKS,
  TOGGLE_TASK_COMPLETE
} from "./constants";

const initialState = fromJS({
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
      label: "Task 3",
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
      label: "Task 4",
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
      label: "Task 5",
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
      label: "Task 6",
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
  switch (action.type) {
    case ADD_TASK: {
      const {
        payload: { newTask }
      } = action;

      if (newTask.label.trim() === "") {
        return state;
      }

      const preparedNewTask = { ...newTask };

      preparedNewTask.uuid = uuid();

      preparedNewTask.createdOn = Date.now();

      preparedNewTask.edited = {
        label: "",
        assignee: ""
      };

      const updatedTasks = state.update("tasks", tasksList =>
        tasksList.push(fromJS(preparedNewTask))
      );

      return state.merge(updatedTasks);
    }

    case REMOVE_ASSIGNEE_FROM_TASKS: {
      const {
        payload: { uuid: taskToUpdateUuid }
      } = action;

      const tasks = state.get("tasks").toJS();

      tasks
        .filter(item => item.assignee === taskToUpdateUuid)
        .map(task => {
          task.assignee = "";
          return task;
        });

      return state
        .set("loading", false)
        .set("error", false)
        .set("tasks", fromJS(tasks));
    }

    case UPDATE_EDITED_TASK: {
      const {
        payload: { uuid: taskToUpdateUuid, edited }
      } = action;

      const tasks = state.get("tasks");

      const updatedTasks = tasks.update(
        tasks.findIndex(function(item) {
          return item.get("uuid") === taskToUpdateUuid; // find the task in the List you want to update
        }),
        function(item) {
          return item.set("edited", item.get("edited").merge(edited)); // set edited to what edited it and merge something else
        }
      );

      return state
        .set("loading", false)
        .set("error", false)
        .set("tasks", updatedTasks);
    }

    case UPDATE_TASK: {
      const {
        payload: { uuid: taskToUpdateUuid }
      } = action;

      const tasks = state.get("tasks");

      const updatedTasks = tasks.update(
        tasks.findIndex(function(item) {
          return item.get("uuid") === taskToUpdateUuid; // find the task in the List you want to update
        }),
        function(item) {
          const editedTask = item.toJS().edited;

          const triggerReturn = false;

          Object.keys(editedTask).forEach(field => {
            // Object.keys(editedTask) = ["label", "assignee"]
            // field = "label" or "assignee"
            if (editedTask[field].trim() === "") {
              // editedTask[field]
              // field = "label"
              // editedTask = { label: "", assignee: "123jn12jk3n123kj" }
              triggerReturn = true;
            }
          });

          if (triggerReturn) {
            return item;
          }

          return item.merge(editedTask);
        }
      );

      return state
        .set("loading", false)
        .set("error", false)
        .set("tasks", updatedTasks);
    }

    case TOGGLE_TASK_COMPLETE: {
      const {
        payload: { uuid: taskToUpdateUuid }
      } = action;

      const tasks = state.get("tasks");

      const updatedTasks = tasks.update(
        tasks.findIndex(function(item) {
          return item.get("uuid") === taskToUpdateUuid; // find the task in the List you want to update
        }),
        function(item) {
          return item.set("completed", !item.toJS().completed);
        }
      );

      return state
        .set("loading", false)
        .set("error", false)
        .set("tasks", updatedTasks);
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
    default:
      return state;
  }
}

export default appReducer;
