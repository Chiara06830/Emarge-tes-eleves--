import React from 'react';
import { View } from 'react-native';
import PageConnexion from './components/connexion';
import Onglet from './components/tab';
import PageErreur from './components/erreur';

class Index extends React.Component {
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
      this.state.etat === 'sceance' ? <Onglet /> :
      <PageErreur/>

      return (
          <View style={{flex: 1}}>
            { page }
          </View>
      );
    }
}

export default function App(){
  return (<Index/>);
}