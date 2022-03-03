import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCF2wflasPo-ZQs5WPr2jj2rSa7rAen_rA",
    authDomain: "govarprof.firebaseapp.com",
    projectId: "govarprof",
    storageBucket: "govarprof.appspot.com",
    messagingSenderId: "56838360554",
    appId: "1:56838360554:web:eb3e2b21082b6f8d39f693"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)