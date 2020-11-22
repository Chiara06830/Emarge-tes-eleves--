import React, { Component } from 'react';
import { View, Text, Button, TextInput} from 'react-native'
import theme from '../style'

class PageConnexion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            etat: props.changeEtat,
            identifiant: '',
            motDePasse: '',
            erreur: 0
        }
    }

    connexion() {
        // back verif connexion

        // changment de page si ok
        //this.state.etat('accueil')
    }

    messageErreur() {
        if(this.state.erreur === 1) {
            return (
                <Text style={{color:"#FF0000"}}>Erreur lors de la connexion, veuillez vérifier vos identifiants</Text>
            )
        }
    }

    setIdentifiant (identifiant) {
        this.setState({identifiant: identifiant})
    }

    setMotDePasse (motDePasse) {
        this.setState({motDePasse: motDePasse})
    }

    render() {
        return(
            <View style={theme.container}>
                <Text style={theme.title}>Connexion</Text>
                <Text style={theme.texte}>Identifiant :</Text>
                <TextInput
                    onChangeText={(text) => this.setIdentifiant(text)}
                    value={this.state.identifiant} 
                />
                <Text style={theme.texte}>{"\n\n"}Mot de passe :</Text>
                <TextInput type="password" id="password" required 
                    onChangeText={(text) => this.setMotDePasse(text)}
                    value={this.state.motDePasse}
                />
                <Text>{"\n"}</Text>
                <Text style={theme.lien}
                    onPress={() => this.state.etat('motDePasseOublie')}>
                    Mot de passe oublié ?
                </Text>
                <Text>{"\n"}</Text>
                <Button onPress={() => this.connexion()} title="Se connecter"/>
                {this.messageErreur()}
            </View>
        )
    }

}

export default PageConnexion;