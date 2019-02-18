import { ADD_TASK } from "../TasksList/constants";

export function addTask(newTask) {
  return {
    type: ADD_TASK,
    payload: { newTask }
  };
}
