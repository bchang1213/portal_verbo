import React from 'react';
import { Text, TextInput, View, StyleSheet, ActvityIndicator, ListView} from 'react-native';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {inputText: '', outputText :[],};
	}

	//this function will make an ajax call to the apiURL. the result will be an array of objects. I will then loop through that array of objects
	//and add each object into the array of outputText, which is key-value pair of the state object. Complicated, i know...
	retrieveTranslationData(){
		let targetWord = this.state.inputText;
		console.log("The Target Word: " + targetWord);

		let apiURL = 'http://api.ultralingua.com/api/definitions/eng/por/' + targetWord.toLowerCase();
		console.log("The API URL requested: " + apiURL);

		let eachResult = {};

		return fetch(apiURL)
			.then((response) => response.json())
			.then((responseJson) => {
				console.log("Response from API received.");
				//looping through the array of responseJson
				for(let word = 0; word < responseJson.length; word++){
					console.log("Looping through the API response Array: " + responseJson[word]);
					eachResult = responseJson[word];
					this.state.outputText.push(eachResult);
					console.log("Printing Output Text");
					console.log(this.state.outputText);
					//upon retrieving data, process the translation data using my function.
					this.processTranslationData();
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	processTranslationData(){
		console.log("Running process Translation function: ");
		let rawData = this.state.outputText;
		let verbArray = [];
		let verb = "";
		//for each object in the rawData array,
		for(let i = 0; i < rawData.length; i++){
			//loop through each object and test if the word is a verb. If it is a verb, then push it into verbArray.
			for(let wordProperty in rawData[i]){
				if(wordProperty == "partofspeech"){
					for(partOfSpeechProperty in rawData[i]["partofspeech"]){
						if(partOfSpeechProperty == "partofspeechcategory"){
							if(rawData[i]["partofspeech"]['partofspeechcategory'] == "verb"){
								verbArray.push(rawData[i]); //push each whole verb object into the verbArray to collect all verb objects.
								console.log("Verb Array updated: " + verbArray);
							}
						}
					}
				}
			}
		}

		//now loop through verbArray.
		for(key in verbArray){
			if(key == "root"){
				verbArray[key];
			}
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>PORTALVerbo</Text>
				<View style={{padding: 10}}>
					<TextInput
						style={styles.textInputArea}
						placeholder="Type here to translate!"
						onChangeText={(text) => this.setState({inputText:text},
						function(){
							this.retrieveTranslationData();
						}
						)}
					/>
					<Text>..em Portugues é</Text>
					<Text>{this.state.outputText}</Text>
				</View>
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
	textInputArea: {
		height: 40,
	},
	buttonText: {
		padding: 20,
		color: 'white'
	}
})