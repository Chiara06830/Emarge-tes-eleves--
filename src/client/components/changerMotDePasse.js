import React, { Component } from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import theme from '../style';

export class ChangerMotDePasse extends Component {
    constructor(props){
        super(props);
        this.state = {
            etat :props.changeEtat,
            nouveauMdp:'',
            nouveauMdpConf:''

        }
    }

    setNouveauMdp(nouveauMdp){this.setState({nouveauMdp:nouveauMdp})}

    setNouveauMdpConf(nouveauMdpConf){this.setState({nouveauMdpConf:nouveauMdpConf})}


    onPress= (e) => {
        if((this.state.nouveauMdp!== '') && (this.state.nouveauMdpConf!== '') && (this.state.nouveauMdp === this.state.nouveauMdpConf)  ){
            if(this.state.nouveauMdp === this.state.nouveauMdpConf){
                fetch(`http://localhost:5600/updatePassword?identifiant=${this.props.id}&password=${this.state.nouveauMdp}`)
                .then(res => res.json())
                .then(res => {
                    if(res.data){
                        this.state.etat('connexion');
    
                    }
                    else{
                        alert("Erreur : le mot de passe n'a pas été changé");
    
                    }
                    
                })
            }
            else{
                alert("Les mot de passe entrés ne sont pas les mêmes")


            }
        }
        else{
            alert("Veuillez entrer un mot de passe");

        }


    }

    render() {
        return (
            <View style={theme.container}>
                <Text style={theme.title}>Changer mon de passe</Text>

                <TextInput 
                    secureTextEntry={true}
                    style={theme.input}
                    type='text'
                    placeholder='Nouveau mot de passe'
                    id='nouveauMdp'
                    onChangeText ={(text) => this.setNouveauMdp(text)}
                    value = {this.state.nouveauMdp}
                    required
                />

                <TextInput 
                    secureTextEntry={true}
                    style={theme.input}
                    type='text'
                    placeholder='Confirmer votre nouveau mot de passe'
                    id='nouveauMdpConf'
                    onChangeText = {(text)=> this.setNouveauMdpConf(text)}
                    value={this.state.nouveauMdpConf}
                    required
                />

                <Button 
                    color={theme.buttonColor}
                    title="Valider"
                    onPress={this.onPress}
                />

            </View>
            

        )
    }
}

export default ChangerMotDePasse;
