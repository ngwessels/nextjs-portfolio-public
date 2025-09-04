//Axios
import axios from "axios";

//firebase
import firebase from "../firebase";

self.onmessage = async ({
  data: { method, url, body, collectBusinessInfo, headers },
}) => {
  const axiosCall = (token, userId) => {
    const apiCall = axios({
      method,
      url,
      data: body,
      headers: {
        X_Authorization: token,
        AuthorizationId: userId,
      },
    });
    apiCall
      .then((res) => {
        self.postMessage({
          success: true,
          data: res.data,
        });
      })
      .catch((error) => {
        self.postMessage({
          success: false,
          error: JSON.stringify(error.response),
        });
      });
  };

  if (!firebase.auth()?.currentUser?.uid) {
    const unsubscrible = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        unsubscrible();
        const token = await firebase.auth().currentUser.getIdToken();

        // runCall(token, user.uid)
        axiosCall(token, user.uid);
      }
    });
  } else {
    const token = await firebase.auth().currentUser.getIdToken();
    axiosCall(token, firebase.auth().currentUser.uid);
  }
};
