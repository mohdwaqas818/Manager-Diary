import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {Card, CardSection, Input, Button, Spinner} from './common';
import {emailChanged, passwordChanged, loginUser} from '../actions';
import {connect} from 'react-redux';

const image = {uri: "https://i.pinimg.com/originals/83/1a/1b/831a1b836bc774fddec71d6c7f289ad6.png"};

class LoginForm extends Component{
	onEmailChange(text){
		this.props.emailChanged(text);
	}

	onPasswordChange(text){
		this.props.passwordChanged(text);
	}

	onButtonPress(){
		const {email, password} = this.props;
		this.props.loginUser({email, password});
	}

	renderButton() {
		if(this.props.loading){
			return <Spinner size = "large" />;
		}
		return(
			<Button onPress={this.onButtonPress.bind(this)}>
				Login
			</Button>
		);
	}

	renderError() {
		if(this.props.error){
			return(
				<View style={{backgroundColor: 'white'}}>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			);
		}
	}

	render(){
		return(
		<ImageBackground source={image} style={styles.image}>
			<Card>
				<CardSection>
					<Input
						label = "Email"
						placeholder = "test@gmail.com"
						onChangeText = {this.onEmailChange.bind(this)}
						value = {this.props.email}
					/>
				</CardSection>
				<CardSection>
					<Input
						secureTextEntry
						label = "Password"
						placeholder = "password"
						onChangeText = {this.onPasswordChange.bind(this)}
						value = {this.props.password}
					/>
				</CardSection>
				{this.renderError()}
				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		</ImageBackground>
		);
	}
}

const mapStateToProps = ({auth}) => {
	const {email, password, error, loading} = auth;
	return {email, password, error, loading};
};

const styles = StyleSheet.create({
 	errorTextStyle: {
 		fontSize: 20,
 		alignSelf: 'center',
 		color: 'red'
 	},

 	image: {
	    flex: 1,
	    resizeMode: "cover",
	    justifyContent: "center"
	  },
});

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm);