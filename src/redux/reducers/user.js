//constants
import c from "../../constants";

const user = (state = { isLoggedIn: null, user: null }, action) => {
  let newState = { ...state };
  switch (action.type) {
    case c.SET_USER:
      newState.user = action.results ? action.results : null;
      newState.isLoggedIn = action?.results?.email ? true : false;
      break;
  }
  return newState;
};

export default user;
