import firebase from "firebase";

import firebaseConfig from "./firebaseConfig";

export const initialiseFirebase = () => {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
};

export const setAuthStateChangedHandler = (setCurrentLessonId: Function) => {
  firebase.auth().onAuthStateChanged(user => {
    const uid = user && user.uid;
    const db = firebase.firestore();

    if (uid) {
      const userDoc = db.collection("users").doc(uid);
      userDoc.get().then(doc => {
        if (doc.exists) {
          const { currentLessonId = 0 } = doc.data() || {};
          setCurrentLessonId(currentLessonId);
        }
      });

      userDoc.onSnapshot(doc => {
        const { currentLessonId = 0 } = doc.data() || {};
        // const { currentLessonId } = doc.data();
        setCurrentLessonId(currentLessonId);
      });
    }
  });
};

// TODO: Won't be one lesson ID. Will be array of numbers (ids of completed lessons)
export const updateFirebaseLessonId = async (currentLessonId: number) => {
  const user = firebase.auth().currentUser;
  const uid = user && user.uid;

  if (uid) {
    await firebase
      .firestore()
      .collection("/users")
      .doc(uid)
      .set({
        currentLessonId
      });
  }
};
