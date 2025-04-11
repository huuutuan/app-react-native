// Import the functions you need from the SDKs you need
import  {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC9bgVeJT9q3QNOWGFyKHOytE5COG3JqEA",
	authDomain: "garden-esp8266.firebaseapp.com",
	databaseURL: "https://garden-esp8266-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "garden-esp8266",
	storageBucket: "garden-esp8266.firebasestorage.app",
	messagingSenderId: "385387298522",
	appId: "1:385387298522:web:f03b2e8a7dc9a119cdefe3",
	measurementId: "G-K269PF492F"
      };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);