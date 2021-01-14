import React from 'react';
import { View } from 'react-native';
import PageConnexion from './components/connexion';
import Onglet from './components/tab';
import MotDePasseOublie from './components/motDePasseOublie';
import ChangerMotDePasse from './components/changerMotDePasse';
import PageErreur from './components/erreur';

class Index extends React.Component {
    state = {
        etat: 'connexion',
        id : -2,
        idSeance : -1
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

    changeIdSeance = (id) => {
      this.setState({
        idSeance : id
      })
    }

    render() {
      const page = this.state.etat === 'connexion' ? <PageConnexion changeEtat={this.changeEtat} changeId={this.changeId} /> : 
      this.state.etat === 'sceance' ? <Onglet changeEtat={this.changeEtat} id={this.state.id} changeId={this.changeId} changeIdSeance={this.changeIdSeance} idSeance={this.state.idSeance}/> :
      this.state.etat === 'motDePasseOublie' ? <MotDePasseOublie changeEtat={this.changeEtat} changeId={this.changeId}/> :
      this.state.etat === 'changerMotDePasse' ? <ChangerMotDePasse changeEtat={this.changeEtat} id={this.state.id}/> : 
      <PageErreur/>

      return (
          <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
            { page }
          </View>
      );
    }
}

export default function App(){
  return (<Index/>);
}