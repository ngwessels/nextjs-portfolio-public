//constants
import c from "../../constants";

const github = (
  state = { projects: {}, languages: [], level1Height: 0 },
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case c.GITHUB:
      newState = action.results;
      break;
  }
  return newState;
};

export default github;
