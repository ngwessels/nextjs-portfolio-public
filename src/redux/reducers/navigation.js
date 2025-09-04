//constants
import c from "../../constants";

const object = `[]`;

const navigations = (state = JSON.parse(object), action) => {
  let newState = [...state];
  switch (action.type) {
    case c.SET_NAVIGATION_MENU:
      newState = action.results;
      break;
  }
  return newState;
};

export default navigations;
