import React, { Component } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import styles from './styles';

export default class New extends Component {
    static navigationOptions = {
        header: null,
        
    };

    state = {
        newTweet: '',
    };

    goBack = () => {
        this.props.navigation.pop();
    };

    handleInputChange = newTweet => {
        this.setState({ newTweet });
    };

    hadleNewTweet = async () => {
        const content = this.state.newTweet;
        const author = await AsyncStorage.getItem('@GoTwitter:username');

        await api.post('/tweets',{ content, author });
        this.goBack();
    };



    render() {
        return (
            <SafeAreaView style={styles.container}>
               <View style={styles.header}>
                    <TouchableOpacity
                        onPress={this.goBack}
                    >
                        <Icon name="close" size={24} color="#4BB0EE"/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.hadleNewTweet}
                    >
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>

               </View>
               <TextInput 
                    style={styles.input}
                    multiline
                    placeholder="O que está acontecendo ?"
                    value={this.state.newTweet}
                    onChangeText={this.handleInputChange}
                    placeholderTextColor="#DDD"
                    returnKeyType="send"
                    onSubmitEditing={this.hadleNewTweet}
               />
            </SafeAreaView>
        );
    }
}