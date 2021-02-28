import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import firebase from "./Firebase";

const registerForPushNotifications = () => {
    const uid = firebase.auth().currentUser.uid;
    return new Promise(async (resolve, reject) => {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (!status) {
            status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        if (!status) {
            alert("push notifications disabled ");
        }
        var t = await Notifications.getExpoPushTokenAsync();
        var token = t.data;
        firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .set({ expoToken: token }, { merge: true })
            .then(() => {
                resolve(token);
            })
            .catch((err) => reject(err));
    });
};
const sendPushNotification = (uid, message) => {
    getExpoPushToken(uid).then(async (expoPushToken) => {
        const msg = {
            to: expoPushToken,
            sound: "default",
            title: "Gharbaar",
            body: message,
            data: { someData: "goes here" },
        };
console.log(expoPushToken)
        await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(msg),
        })
    });
};
const getExpoPushToken = (uid) => {
    return new Promise((resolve, reject) => {
        firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then((doc) => {
                resolve(doc.data().expoToken);
            })
            .catch((err) => reject(err));
    });
};
const deletePushToken = () => {
    const uid = firebase.auth().currentUser.uid
    return new Promise((res, rej) => {
        firebase.firestore().collection('users').doc(uid).update({ expoToken: firebase.firestore.FieldValue.delete() }).then(() => {
            res('Successfully deleted push token ')
        }).catch((err) => rej(err))
    })
}

export { registerForPushNotifications, sendPushNotification, deletePushToken };