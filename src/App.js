import React, { Component } from 'react';
import './App.css'
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
  apiKey: "AIzaSyDQeq4OE3WEI4Rv15aEHdKBbtN5I_pnyZg" ,
  authDomain: "quantumhack2020.firebaseapp.com"
})

export class App extends Component{
  
  state = { isSignedIn : false}  
  uiConfig = {
    signInFlow : "popup" ,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState( { isSignedIn: !!user } )
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In</div>
            <button onClick = { ()=> firebase.auth().signOut()}>Sign Out</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          </span>        
          ) : (
            <StyledFirebaseAuth
              uiConfig ={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />  
          )  
        }
      </div>
    ); 
  };
};

export default App;