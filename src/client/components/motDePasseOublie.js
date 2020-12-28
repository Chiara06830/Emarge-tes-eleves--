import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import theme from '../style';

class MotDePasseOublie extends Component{
    constructor(props){
        super(props);
        this.state = {
            etat: props.changeEtat,
            email : ''
        }
    }

    setEmail(email){this.setState({email: email})}

    onPress= (e) => {
        this.state.etat('changerMotDePasse');
    }

    render(){
        return(

            <View style={theme.container}>
                <Text style={theme.title}>Réinitialiser mon mot de passe</Text>            
                <TextInput 
                    style={theme.input}
                    type ='text'  
                    placehorder='Entrer votre email'
                    id='email'
                    onChangeText={(text) => this.setEmail(text)}
                    required
                />

                <Button
                    title="Envoyer un courriel" 
                    onPress={() => this.onPress()} 
                />

            </View>
        )

    }






}

export default MotDePasseOublie;