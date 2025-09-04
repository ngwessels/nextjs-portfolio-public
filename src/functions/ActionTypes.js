//firebase
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  getIdToken,
  getIdTokenResult
} from "firebase/auth";
const auth = getAuth();

//uuid
import { v4 as uuid } from "uuid";

//Axios
import axios from "axios";

//Constants
import c from "./../constants";

//Client Clode

//Update Props
export const reduxDispatch = (props, action) => {
  try {
    const { dispatch } = props;
    if (Array.isArray(action)) {
      for (let x in action) {
        if (dispatch) dispatch(action[x]);
      }
    } else if (action) {
      if (dispatch) dispatch(action);
    }
  } catch (err) {
    console.error(err);
  }
};

export const SSRSetup = (props) => {
  //NEXTJS SSR Setup
  if (props?.response?.dispatch) {
    reduxDispatch(props, props?.response?.dispatch);
  }
  setTimeout(() => {
    if (props?.response?.warning) {
      addWarning(props, props?.response?.warning);
    }
    if (props?.response?.error) {
      addError(props, props?.response?.error);
    }
    if (props?.response?.success) {
      addSuccess(props, props?.response?.success);
    }
  }, 500);
};

export const disableScroll = () => {
  //Disables scrolling for window
  // Get the current page scroll position
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // if any scroll is attempted, set this to the previous value
  window.onscroll = () => {
    window.scrollTo(scrollLeft, scrollTop);
  };
};

export const enableScroll = () => {
  //Enables scrolling for window
  window.onscroll = function () {};
};

export const cipherText = (text) => {
  //Cipher text
  const CryptoJS = require("crypto-js");
  const ciphertext = CryptoJS.AES.encrypt(
    text,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY
  ).toString();
  return ciphertext;
};

export const cipherObject = (object) => {
  //Cipher Object
  const CryptoJS = require("crypto-js");
  const cipherObject = CryptoJS.AES.encrypt(
    JSON.stringify(object),
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY
  ).toString();
  return cipherObject;
};

export const decryptObject = (object) => {
  //Decrypt Object
  const CryptoJS = require("crypto-js");
  const bytes = CryptoJS.AES.decrypt(
    object,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY
  );
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

export const returnYearString = (milliseconds) => {
  const current = new Date(milliseconds);
  const year = current.getFullYear();
  return year;
};

export const returnDateString = (milliseconds) => {
  //Creates readable date/time from milliseconds
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const current = new Date(milliseconds);
  const offset = current.getTimezoneOffset() * 60 * 1000;
  const time = milliseconds + offset;
  const d = new Date(time);
  const month = months[d.getMonth()];
  const day = days[d.getDay()];
  const year = d.getFullYear();
  return `${day} ${month} ${d.getDate()}, ${year}`;
};

export const checkPermissions = (user, permissions) => {
  //Checks user permissions
  try {
    if (!user.uid) return false;
    if (!permissions) return false;
    const customClaims = user?.customClaims || {};
    const { permission, and, or } = permissions;
    if (customClaims["site_admin"] === true) return true;
    if (permission) {
      if (customClaims[permission] === true) return true;
      else return false;
    } else if (and && and.length > 0) {
      let status = true;
      for (let x in and) {
        const type = and[x];
        if (type === "site_admin" && customClaims[type] === true) {
          status = true;
          return status;
        }
        if (!customClaims[type] || customClaims[type] === false) status = false;
      }
      return status;
    } else if (or && or.length > 0) {
      let status = false;
      for (let x in or) {
        const type = or[x];
        if (customClaims[type] === true) status = true;
      }
      return status;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const addError = (props, data) => {
  const errorId = uuid();
  const action = {
    type: "ADD_ERROR",
    errorId,
    results: data
  };
  reduxDispatch(props, action);
};

export const addSuccess = (props, data) => {
  const successId = uuid();
  const action = {
    type: "ADD_SUCCESS",
    successId,
    results: data
  };
  reduxDispatch(props, action);
};

export const addWarning = (props, data) => {
  const warningId = uuid();
  const action = {
    type: "ADD_WARNING",
    warningId,
    results: data
  };
  reduxDispatch(props, action);
};

export const currentUrl = (url) => {
  const array = url.split("");
  let newURL = "";
  if (array[0] === "/") url = url.replace("/", "");
  return `/${url}`;
};

export const apiParse = (props, data) => {
  try {
    if (props && data.dispatch) {
      for (let x in data.dispatch) {
        reduxDispatch(props, data.dispatch[x]);
      }
    }
    if (data.alert) {
      alert(data.alert);
    }
    if (data.error) {
      addError(props, data.error);
    }
    if (data.success) {
      addSuccess(props, data.success);
    }
    if (data.warning) {
      addWarning(props, data.warning);
    }
    if (data.link && data.link.url) {
      window.open(data.link.url, "_blank");
    }
    if (data.router) {
      props.router.push(data.router);
    }
  } catch (err) {
    console.error(err);
  }
};

export const apiError = (props, err) => {
  try {
    let data = err.data;
    if (props && data.dispatch) {
      for (let x in data.dispatch) {
        reduxDispatch(props, data.dispatch[x]);
      }
    }
    if (data.alert) {
      alert(data.alert);
    }
    if (data.link && data.link.url) {
      window.open(data.link.url, "_blank");
    }
    if (data.router) {
      props.router.push(data.router);
    }
    if (data.errorCode && data.results) data.results.errorCode = data.errorCode;
    if (data.error && data.results) {
      data.results.error = data.error;
    }
    if (data.error) {
      addError(props, data.error);
    }
    if (data.success) {
      addSuccess(props, data.success);
    }
    if (data.warning) {
      addWarning(props, data.warning);
    }
    if (data.back === true) {
      props.router.back();
    }
  } catch (err) {
    console.error(err);
  }
};

export const Api = async (props, method, path, body, callback, headers) => {
  const url = props ? currentUrl(path) : path;

  if (typeof headers === "string" && headers !== "") {
    headers = JSON.parse(headers);
  }
  if (props) {
    //If Props exists this typically means the component has mounted
    const callWorker = async (workerCallback) => {
      const axiosCall = async (token, userId) => {
        const apiCall = axios({
          method,
          url,
          data: body,
          headers: {
            X_Authorization: token,
            AuthorizationId: userId
          }
        });
        apiCall
          .then((res) => {
            workerCallback({ data: res.data, success: true, error: false });
          })
          .catch((error) => {
            workerCallback({
              data: null,
              success: false,
              error
            });
            // return resolve({ results: error.response.data });
          });
      };
      if (!auth?.currentUser?.uid) {
        const unsubscrible = onAuthStateChanged(auth, async (user) => {
          if (user) {
            unsubscrible();
            const token = await user.getIdToken();
            // runCall(token, user.uid)
            axiosCall(token, user.uid);
          }
        });
      } else {
        const token = await auth.currentUser.getIdToken();
        axiosCall(token, auth.currentUser.uid);
      }
    };
    if (callback) {
      //If callback is defined it will callback rather than returning
      callWorker(({ success, data, error }) => {
        if (props) {
          if (success) {
            apiParse(props, data);
          } else {
            apiError(props, error.response);
          }
          return callback(data?.results || data || false);
        } else {
          return callback(data || error?.response?.data);
        }
      });
    } else {
      //Callback is not defined therefore this is now considered a promise
      return new Promise((resolve, reject) => {
        callWorker(({ success, data, error }) => {
          if (props) {
            if (success) {
              apiParse(props, data);
            } else {
              apiError(props, error.response);
            }
            return resolve(data?.results || data || false);
          } else {
            return resolve(data || error?.response?.data);
          }
        });
      });
    }
  } else {
    //If Props does not exist. This typically means your requesting the api before the component has mounted
    if (callback) {
      //If callback is defined it will callback rather than returning
      const apiCall = axios({
        method,
        url,
        data: body,
        headers: {
          X_Authorization: headers?.token || "",
          AuthorizationId: headers?.userId || ""
        }
      });
      apiCall
        .then((res) => {
          return callback(res.data);
        })
        .catch((error) => {
          console.error(error);
          return callback({ results: error.response.data });
        });
    } else {
      //Callback is not defined therefore this is now considered a promise
      return new Promise(async (resolve, reject) => {
        const apiCall = axios({
          method,
          url,
          data: body,
          headers: {
            X_Authorization: headers?.token || "",
            AuthorizationId: headers?.userId || ""
          }
        });
        apiCall
          .then((res) => {
            return resolve(res.data);
          })
          .catch((error) => {
            console.error(error);
            return reject({ results: error.response.data });
          });
      });
    }
  }
};

export const Auth = async (props) => {
  let count = 0;
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await getIdToken(user, true);
      await getIdTokenResult(user, true);
      if (!props?.user?.isLoggedIn) {
        // Api(props, "get", "/api/user", {}, (e) => {
        //   reduxDispatch(props, e.dispatch);
        // });
      }
      count++;
    } else {
      await signInAnonymously(auth);
      const actionArray = [{ type: c.SET_USER, results: null }];
      reduxDispatch(props, actionArray);
      count++;
    }
  });
};

export const watchAuth = (
  props,
  prevProps = {},
  permissions = {},
  callback
) => {
  if (
    JSON.stringify(props?.user || {}) !== JSON.stringify(prevProps?.user || {})
  ) {
    if (props?.user?.isLoggedIn === null) {
      return;
    }
    if (props?.response?.pageSEO?.permissions) {
      permissions = {
        ...props?.response?.pageSEO?.permissions,
        ...permissions
      };
    }
    const check = checkPermissions(props?.user?.user || {}, permissions);
    if (check) {
      //Is authorized
      callback(true);
    } else {
      //Not Authorized
      addError(props, "You are not authorized to access this data!");
      const action = {
        type: c.ROUTE,
        results: props?.router?.asPath || "/"
      };
      reduxDispatch(props, action);
      if (props?.router) {
        props.router.push("/login");
      } else {
        window.location.href = `https://www.verboort.org/login/`;
      }
      callback(false);
    }
  }
};

export const consoleLog = (e) => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production") {
    console.log(e);
  }
};
