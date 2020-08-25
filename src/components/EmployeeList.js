import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import ListView from "deprecated-react-native-listview";
import {connect} from 'react-redux';
import {employeesFetch} from '../actions';
import ListItem from './ListItem';

const image = {uri: "https://wallpaperaccess.com/full/260161.jpg"};

class EmployeeList extends Component{
	componentWillMount() {
		this.props.employeesFetch();
		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps){
		this.createDataSource(nextProps);
	}

	createDataSource({employees}){
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});
		this.dataSource = ds.cloneWithRows(employees);
	}

	renderRow(employee){
		return <ListItem employee={employee} />;
	}

	render(){
		return(
			<ImageBackground source={image} style={styles.image}>
				<ListView 
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow}
				/>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	image: {
	    flex: 1,
	    resizeMode: "cover",
	    justifyContent: "center"
	  },
});

const mapStateToProps = state => {
	const employees = _.map(state.employees, (val, uid) => {
		return {...val, uid};
	});
	return {employees};
}

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);