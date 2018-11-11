import React, { Component } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from './styles';

export default class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        username: '',
    };

    async componentDidMount() {
        const username = await AsyncStorage.getItem('@GoTwitter:username');

        if (username) {
            this.goToTimeline();
        }
    }


    handleInputChange = username => {
        this.setState({ username });
    };

    handleLogin = async () => {
        const { username } = this.state;

        if (!username.length) return;

        await AsyncStorage.setItem('@GoTwitter:username', username);

        this.goToTimeline();

    };

    goToTimeline = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Timeline' }),
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.content}>
                    <View>
                        <Icon name="twitter" size={64} color="#4BB0EE" />
                    </View>
                    <TextInput 
                        style={styles.input}
                        placeholder="Nome do usuário"
                        value={this.state.username}
                        onChangeText={this.handleInputChange}
                        returnKeyType="send"
                        onSubmitEditing={this.handleLogin}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleLogin}
                    >
                        <Text style={styles.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}