//constants
import c from "../../constants";

const history = (state = [], action) => {
  let newState = [...state];
  switch (action.type) {
    case c.ROUTER_HISTORY_PUSH:
      newState.push(action.results);
      break;
    case c.ROUTER_HISTORY_SPLICE:
      const length = newState.length;
      newState.splice(length - 1, 1);
      break;
  }
  return newState;
};

export default history;
