
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApA1dmKsy8NDpieUVqjFchO3D2ngCI2eI",
  authDomain: "chat-app-63fa8.firebaseapp.com",
  projectId: "chat-app-63fa8",
  storageBucket: "chat-app-63fa8.appspot.com",
  messagingSenderId: "444213135207",
  appId: "1:444213135207:web:38d3e59206d3bf2777d1c2"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);