import React, { Component } from 'react';
import {Text, Button, View, SafeAreaView, FlatList} from 'react-native';
import styles from '../style';
import Row from './rowAppel';

const DATA =
{
    id: 1,
    nomUE : 'Java Avancé',
    type :'TD',
    nomFiliere : 'L3 II',
    numGroup : 1,
    dateSeance : '13-07-2020',
    creneau : '13h-15h',
    nomEnseignant : "LEMAITRE",
    prenomEnseignant : "Claude",
    etudiant : [
        {id : 1, nom :'Dupond', prenom : 'Jean', presence : 0, photo : 'king.PNG'},
        {id : 2, nom : 'Duchemin', prenom : 'Marie', presence : 1, photo : 'fille.PNG'},
        {id : 3, nom : 'Dubois', prenom : 'Bertrand', presence : 1, photo : 'vert.PNG'}
    ]
}

export default class PageAppel extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : null,
            headTable : ['Nom', 'Prénom', 'Présence'],
            dataTable: null
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){ //temporaire
        this.setState({data : DATA});
        this.setState({dataTable : DATA.etudiant});
    }

    valider(){
        this.props.changeId(-1);
        this.props.changeOnglet('Creation');
    }

    render(){
        const renderItem = ({ item }) => (
            <Row 
                id = {item.id}
                nom = {item.nom}
                prenom = {item.prenom}
                presence = {item.presence}
                photo = {item.photo}/>
        );

        if(this.state.data != null){
            return (
                <View >
                    <Text style={styles.title}>UE {this.state.data.nomUE}</Text>
                    <Text>Type de cours : {this.state.data.type}</Text>
                    <Text>Groupe : {this.state.data.nomFiliere} - G{this.state.data.numGroup}</Text>
                    <Text>Date : {this.state.data.dateSeance}</Text>
                    <Text>Enseignant : {this.state.data.prenomEnseignant} {this.state.data.nomEnseignant}</Text>
                        <FlatList
                            data={this.state.dataTable}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    <Button title="Valider" onPress={() => this.valider()}/>
                </View>
            );
        }else {
            return(
                <Text>chargement</Text>
            );
        }
        
    }
}