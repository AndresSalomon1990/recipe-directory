import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC0m-nfT2dJKn8lt5Q5ulFBQnxAennQWVM',
  authDomain: 'recipes-directory-177e4.firebaseapp.com',
  projectId: 'recipes-directory-177e4',
  storageBucket: 'recipes-directory-177e4.appspot.com',
  messagingSenderId: '881923018972',
  appId: '1:881923018972:web:ae8c715874ed5dd9126419',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
