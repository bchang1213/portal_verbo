import React from 'react';
import { AppRegistry, Text, TextInput, View, StyleSheet, FlatList, Button} from 'react-native';

import Translator from './app/components/Translator/Translator';


export default class Home extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Translator/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 60,
		alignItems: 'center',
		flex: 1,
	},
})

AppRegistry.registerComponent('Home', ()=> Home);