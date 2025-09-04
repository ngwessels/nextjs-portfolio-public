//constants
import c from "../../constants";

const messages = (state = { warning: {}, success: {}, error: {} }, action) => {
  let newState = { ...state };
  switch (action.type) {
    case c.ADD_SUCCESS:
      newState.success[action.successId] = action.results;
      break;
    case c.REMOVE_SUCCESS:
      if (newState.success[action.successId])
        delete newState.success[action.successId];
      break;
    case c.ADD_WARNING:
      newState.warning[action.warningId] = action.results;
      break;
    case c.REMOVE_WARNING:
      if (newState.warning[action.warningId])
        delete newState.warning[action.warningId];
      break;
    case c.ADD_ERROR:
      newState.error[action.errorId] = action.results;
      break;
    case c.REMOVE_ERROR:
      if (newState.error[action.errorId]) delete newState.error[action.errorId];
      break;
  }
  return newState;
};

export default messages;
