import React, {Component} from 'react';
import {Card, CardSection, Input, Button} from './common';
import {Picker, Text, StyleSheet, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {employeeUpdate, employeeCreate} from '../actions';
import EmployeeForm from './EmployeeForm';

const image = {uri: "https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700411453.jpg"};

class EmployeeCreate extends Component{
	onButtonPress() {
		const {name, phone, shift} = this.props;
		this.props.employeeCreate({name, phone, shift: shift || 'Monday'});
	}

	render(){
		return(
			<ImageBackground source={image} style={styles.image}>
				
					<EmployeeForm {...this.props} />
					<CardSection>
						<Button onPress={this.onButtonPress.bind(this)}>
							Create
						</Button>
					</CardSection>
				
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	image: {
	    flex: 1,
	    resizeMode: "cover",
	    
	  },
});

const mapStateToProps = (state) => {
	const {name, phone, shift} = state.employeeForm;
	return {name, phone, shift};
}

export default connect(mapStateToProps, {employeeUpdate, employeeCreate})(EmployeeCreate);