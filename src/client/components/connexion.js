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
        this.state.etat('sceance');
        /*fetch(`http://localhost:3000/connexion?identifiant=${this.state.identifiant}&password=${this.state.motDePasse}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
            .catch(err =>{
                if(err) throw err;
            });*/
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
                <TextInput style={theme.input} type="text" id="identifiant" required placeholder='identifiant'
                    onChangeText={(text) => this.setIdentifiant(text)}
                    value={this.state.identifiant} 
                />
                <Text style={theme.texte}>Mot de passe :</Text>
                <TextInput style={theme.input} type="password" id="motDePasse" required placeholder='mot de passe'
                    onChangeText={(text) => this.setMotDePasse(text)}
                    value={this.state.motDePasse}
                />
                <Text style={theme.lien}
                    onPress={() => this.state.etat('motDePasseOublie')}>
                    Mot de passe oublié ?{"\n"}
                </Text>
                <Button onPress={() => this.connexion()} title="Se connecter"/>
                {this.messageErreur()}
            </View>
        )
    }

}

export default PageConnexion;