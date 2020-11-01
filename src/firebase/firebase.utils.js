import firebase from "firebase/app" ;
import 'firebase/firestore'  ;
import 'firebase/auth' ;

const config = {
    apiKey: "AIzaSyCQ3tIikWchpeKblimyn_VF-uwQ55-GHQo",
    authDomain: "crwn-db-dc238.firebaseapp.com",
    databaseURL: "https://crwn-db-dc238.firebaseio.com",
    projectId: "crwn-db-dc238",
    storageBucket: "crwn-db-dc238.appspot.com",
    messagingSenderId: "292266983535",
    appId: "1:292266983535:web:458e39b8735600c13e8d9a",
    measurementId: "G-L9S6HMHSCG"
};

export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;
    const userRef = await firestore.doc(`user/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName , email} = userAuth ;
        const createdAt = new Date() ;

        try {
            await userRef.set({
                displayName ,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user' , error.message);
        }
    }

    return userRef ;
}

firebase.initializeApp(config) ;

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt : 'select_account'});

export const SignInWithGoogle = () => auth.signInWithPopup(provider) ;

export default firebase ;






