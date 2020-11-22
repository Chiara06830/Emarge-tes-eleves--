import React from 'react'
import { View } from 'react-native';
import PageConnexion from './components/connexion'
import PageErreur from './components/erreur'

export default class App extends React.Component {

    state = {
        etat: 'connexion'
    }

    changeEtat = (valeur) => {
        this.setState({
          etat: valeur
        })
      }

    render() {
        const page = this.state.etat === 'connexion' ? <PageConnexion changeEtat={this.changeEtat}/> : 
        <PageErreur/>

        return (
            <View style={{flex: 1}}>
              { page }
            </View>
        );
    }
}