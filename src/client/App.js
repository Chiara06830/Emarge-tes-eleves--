import React from 'react';
import { View } from 'react-native';
import PageConnexion from './components/connexion';
import Onglet from './components/tab';
import PageErreur from './components/erreur';

class Index extends React.Component {
    state = {
        etat: 'connexion',
        id : -2
    }

    changeEtat = (valeur) => {
      this.setState({
        etat: valeur
      })
    }

    changeId = (id) => {
      this.setState({
        id : id
      })
    }

    render() {
      const page = this.state.etat === 'connexion' ? <PageConnexion changeEtat={this.changeEtat} changeId={this.changeId}/> : 
      this.state.etat === 'sceance' ? <Onglet changeEtat={this.changeEtat} id={this.state.id}/> :
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