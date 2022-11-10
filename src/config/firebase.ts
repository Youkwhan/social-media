// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAa4x6XQ4t4AYwBsG21OSGA02LX0Spn9vE",
	authDomain: "social-media-643d1.firebaseapp.com",
	projectId: "social-media-643d1",
	storageBucket: "social-media-643d1.appspot.com",
	messagingSenderId: "113904163366",
	appId: "1:113904163366:web:a750c2ef4ddb7afbb764e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
