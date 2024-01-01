import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBJSe84WQna4OWD37UAF2n3azFY0FK9HLg",
  authDomain: "leaderboard-cf.firebaseapp.com",
  projectId: "leaderboard-cf",
  storageBucket: "leaderboard-cf.appspot.com",
  messagingSenderId: "172931110595",
  appId: "1:172931110595:web:18c9d8fc603ed1d7beb476",
  measurementId: "G-N4Z8YM5X2W"
};
export const app = initializeApp(firebaseConfig);
export const db = getDatabase();