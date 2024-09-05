import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAyysusMDQE-nL1Jc2O0XsYi-pSchlfXUc",
    authDomain: "login-auth-af443.firebaseapp.com",
    projectId: "login-auth-af443",
    storageBucket: "login-auth-af443.appspot.com",
    messagingSenderId: "627467980658",
    appId: "1:627467980658:web:4a7a67f4a5ca16b358d7eb"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;
