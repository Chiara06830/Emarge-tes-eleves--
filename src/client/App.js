import React from 'react'
import { View } from 'react-native';
import PageConnexion from './components/connexion'
import PageCreationUneSeance from './components/creationUneSeance'
import PageErreur from './components/erreur'

export default class App extends React.Component {

    state = {
        etat: 'creationUneSeance'
    }

    changeEtat = (valeur) => {
        this.setState({
          etat: valeur
        })
    }

    render() {
        const page = this.state.etat === 'connexion' ? <PageConnexion changeState={this.changeState}/> :
        this.state.etat === 'creationUneSeance' ? <PageCreationUneSeance /> :
        <PageErreur/>

        return (
            <View style={{flex: 1}}>
              { page }
            </View>
        );
    }
}