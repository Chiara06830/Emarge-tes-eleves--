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
            console.log(" IT WORKS ! ");
        }
        else{
            console.log("The text fiels are empty !");

        }


    }

    render() {
        return (
            <View style={theme.container}>
                <Text>Changer mon de passe</Text>

                <TextInput 
                    style={theme.input}
                    type='text'
                    placeholder='Nouveau mot de passe'
                    id='nouveauMdp'
                    onChangeText ={(text) => this.setNouveauMdp(text)}
                    value = {this.state.nouveauMdp}
                    required
                />

                <TextInput 
                    style={theme.input}
                    type='text'
                    placeholder='Confirmer votre nouveau mot de passe'
                    id='nouveauMdpConf'
                    onChangeText = {(text)=> this.setNouveauMdpConf(text)}
                    value={this.state.nouveauMdpConf}
                    required
                />

                <Button 
                    title="Valider"
                    onPress={this.onPress}
                />

            </View>
            

        )
    }
}

export default ChangerMotDePasse;
