//constants
import c from "../../constants";

const mediaUpload = (
  state = {
    visible: false,
    type: null,
    callback: null,
    exitCallback: null,
    data: {},
    multiple: false,
    selected: [],
    url: null,
    scrollDisabled: false,
    locationType: null,
  },
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case c.MEDIA_UPLOAD:
      newState.type = action.locationType ? action.locationType : null;
      newState.visible = action.visible ? true : false;
      newState.exitCallback = action.exitCallback
        ? action.exitCallback
        : (e) => {};
      newState.callback = action.callback ? action.callback : (e) => {};
      newState.data = action.data ? action.data : {};
      newState.multiple = action.multiple ? true : false;
      newState.selected = action.selected ? action.selected : [];
      newState.url = action.url ? action.url : null;
      newState.scrollDisabled = action.scrollDisabled ? true : false;
      newState.locationType = action?.locationType || null;
      break;
    case c.MEDIA_UPLOAD_VISIBLE:
      newState.visible = action.results;
      break;
    case c.MEDIA_UPLOAD_CALLBACK:
      newState.callback = action.results;
      break;
    case c.MEDIA_UPLOAD_EXITCALLBACK:
      newState.exitCallback = action.results;
      break;
    case c.MEDIA_UPLOAD_DATA:
      newState.data = action.results;
      break;
    case c.MEDIA_UPLOAD_TYPE:
      newState.type = action.results;
      break;
    case c.MEDIA_UPLOAD_SELECTED:
      newState.selected = action.results;
      break;
    case c.MEDIA_UPLOAD_MULTIPLE:
      newState.multiple = action.results;
      break;
    case c.MEDIA_UPLOAD_URL:
      newState.url = action.url;
      break;
    case c.MEDIA_UPLOAD_SCROLL:
      newState.scrollDisabled = action.scrollDisabled;
      break;
    default:
      break;
  }
  return newState;
};

export default mediaUpload;
