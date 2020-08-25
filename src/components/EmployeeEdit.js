import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import Communications from 'react-native-communications';
import {StyleSheet, ImageBackground} from 'react-native';

const image = {uri: "https://i.pinimg.com/originals/87/76/e1/8776e1c23ed8cb94c029594f26d1adad.jpg"};

class EmployeeEdit extends Component{
	state = {showModal: false};

	componentWillMount() {
	    _.each(this.props.employee, (value, prop) => {
	      this.props.employeeUpdate({ prop, value });
	    });
	}

	onButtonPress() {
	    const { name, phone, shift } = this.props;
		this.props.employeeSave({name, phone, shift, uid: this.props.employee.uid});
	}

	onTextPress() {
		const {phone, shift} = this.props;
		Communications.text(phone, `Your upcoming schedule is on ${shift}`);
	}

	onAccept(){
		const {uid} = this.props.employee;
		this.props.employeeDelete({uid});
	}

	onDecline(){
		this.setState({showModal: false});
	}

	render(){
		return(
			<ImageBackground source={image} style={styles.image}>
				
					<EmployeeForm />
					<CardSection>
						<Button onPress={this.onButtonPress.bind(this)}>
							Save Changes
						</Button>
					</CardSection>
					<CardSection>
						<Button onPress={this.onTextPress.bind(this)}>
							Text Schedule
						</Button>
					</CardSection>

					<CardSection>
						<Button onPress={() => this.setState({showModal: !this.state.showModal})}>
							Fire Employee
						</Button>
					</CardSection>

					<Confirm
						visible={this.state.showModal}
						onAccept={this.onAccept.bind(this)}
						onDecline={this.onDecline.bind(this)}
					>
						Are you sure you want to delete this?
					</Confirm>
				
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

export default connect(mapStateToProps, {employeeUpdate, employeeSave, employeeDelete})(EmployeeEdit);