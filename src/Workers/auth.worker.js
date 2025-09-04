//firebase
import firebase from '../firebase';

//constants
import c from './../constants';



self.onmessage = async ({ data: { } }) => {

};

let count = 0;

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        await user.getIdToken(true);
        firebase.auth().currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                const actionArray = [];
                if (idTokenResult.claims) {
                    actionArray.push({ type: c.USER_CUSTOM_CLAIMS, results: idTokenResult.claims });
                }
                self.postMessage({
                    success: true,
                    dispatch: actionArray,
                    user: JSON.stringify(user),
                    count
                })
                count++;
            }).catch((error) => {
                console.error(error);
            });

    } else {
        self.postMessage({
            success: false,
            user: false,
            count,
        })
        count++;
    }
})