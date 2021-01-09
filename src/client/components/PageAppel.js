import React, { Component } from 'react';
import {ActivityIndicator, Text, Button, View, FlatList} from 'react-native';
import styles from '../style';
import Row from './rowAppel';

export default class PageAppel extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : null,
            dataTable: null
        }
    }

    formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0],
        month = datePart[1], day = datePart[2];

        return day+'/'+month+'/'+year;
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        fetch(`http://localhost:5600/sceance?id=${this.props.id}`)
            .then(res => res.json())
            .then(res => {
                this.setState({data: res});
                this.setState({dataTable : res.etudiant});
            })
            .catch(err =>{
                if(err) throw err;
            });
    }

    valider(){
        this.props.changeId(-1);
        //this.props.changeOnglet('Creation');
    }

    render(){
        const renderItem = ({ item }) => (
            <Row 
                id = {item.idEtudiant}
                nom = {item.nomEtudiant}
                prenom = {item.prenomEtudiant}
                presence = {item.presence}
                photo = {item.photo}
                idSeance={this.props.id}/>
        );

        if(this.state.data != null && this.state.dataTable != null){
            return (
                <View >
                    <Text style={styles.title}>UE {this.state.data.nomUE}</Text>
                    <View style={styles.containerViewRow}>
                        <View>
                            <Text style={{fontSize: 20}}><Text style={{fontWeight: "bold"}}>Type de cours :</Text> {this.state.data.type}</Text>
                            <Text style={{fontSize: 20}}><Text style={{fontWeight: "bold"}}>Groupe :</Text> {this.state.data.nomFiliere} - G{this.state.data.numGroup}</Text>
                        </View>
                        <View>
                            <Text style={{fontSize: 20}}><Text style={{fontWeight: "bold"}}>Date :</Text> {this.formatDate(this.state.data.dateSeance.split("T")[0])}</Text>
                            <Text style={{fontSize: 20}}><Text style={{fontWeight: "bold"}}>Enseignant :</Text> {this.state.data.prenomEnseignant} {this.state.data.nomEnseignant}</Text>
                        </View>
                    </View>
                    <FlatList
                        data={this.state.dataTable}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    <Button color={styles.buttonColor} title="Valider" onPress={() => this.valider()}/>
                </View>
            );
        }else {
            return(
                <ActivityIndicator size="large" color="#ffcc00"/>
            );
        }
    }
}