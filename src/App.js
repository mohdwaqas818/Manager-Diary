import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component{
	componentDidMount(){
		const config = {
		    apiKey: "AIzaSyC3Ff3Qt-HsfqlypfkHNsz_lc3Aoyivr1A",
		    authDomain: "manager-ec3c0.firebaseapp.com",
		    databaseURL: "https://manager-ec3c0.firebaseio.com",
		    projectId: "manager-ec3c0",
		    storageBucket: "manager-ec3c0.appspot.com",
		    messagingSenderId: "837742053739",
		    appId: "1:837742053739:web:dd34825d2cf294b18ee42e",
		    measurementId: "G-RPKGS0WJN4"
		  };
		  // Initialize Firebase
		  firebase.initializeApp(config);
		}

	render(){
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		return(
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;