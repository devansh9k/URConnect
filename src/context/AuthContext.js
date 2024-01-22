import React, { useContext, useState, useEffect } from "react";
import "../firebase";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { updateProfile } from "firebase/compat/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
const Authcontext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false);
  const storage = getStorage();

  async function uploadImage(file, id) {
    console.log(file);

    const fileRef = ref(storage, `avatar/${id}/${file.name}`);

    const snap = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
    console.log(snap.ref.fullPath);
    console.log(url);

    return url;
  }

  async function signup(email, password, name, picture) {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    //console.log(userCredential.user.uid);
    const url = await uploadImage(picture, userCredential.user.uid);

    await userCredential.user.updateProfile({
      displayName: name,
      photoURL: url,
    });

    console.log(userCredential.user);
    const newuser = db.collection("users").add({
      uid: userCredential.user.uid,
      UserName: name,
      Avatar: url,
      email: email,
      bio: null,
    });
    // const newuser= addDoc(collection(db,'users',userCredential.user.uid),{
    //   UserName:name,
    //   Avatar:url,
    //   email:email,
    //   bio:null
    // })
  }

  function ResetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  function signout() {
    return firebase.auth().signOut();
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const useValue = {
    currentUser,
    signup,
    login,
    signout,
    ResetPassword,
  };

  return (
    <Authcontext.Provider value={useValue}>
      {!loading && children}
    </Authcontext.Provider>
  );
}

export function useAuth() {
  return useContext(Authcontext);
}
