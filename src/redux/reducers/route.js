//constants
import c from "../../constants";

const route = (state = "", action) => {
  let newState = state;
  switch (action.type) {
    case c.ROUTE:
      newState = action.results;
      break;
  }
  return newState;
};

export default route;
