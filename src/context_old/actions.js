export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const EDIT_TASK = "EDIT_TASK";

export const addNewTask = (task) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: ADD_TASK,
        payload: task,
      });
    }, 700);
  };
};

export const deleteTask = (taskId) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: DELETE_TASK,
        payload: taskId,
      });
    }, 700);
  };
};

export const editTask = (task, taskId) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: DELETE_TASK,
        payload: { task, taskId },
      });
    }, 700);
  };
};
