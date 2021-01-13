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

        if(this.state.email != ''){
            console.log("Bonjour ");
            fetch(`http://localhost:5600/recovery?email=${this.state.email}`)
            .then( res => res.json())
            .then( res =>{
                console.log("Bonjour 2");
                this.props.changeId(res.data);

                if(res.data != -1){
                    this.state.etat('changerMotDePasse');

                }
                else{
                    alert("Il n'y a pas de compte liée à cette adresse email ");

                }

            })
            .catch(err =>{
                if(err) throw err;
            });


            
        }
        else{
            alert("Veuillez entrer une adresse email");

        }
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
                    color={theme.buttonColor}
                    title="Envoyer un courriel" 
                    onPress={() => this.onPress()} 
                />

            </View>
        )

    }






}

export default MotDePasseOublie;