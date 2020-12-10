import React, { Component } from 'react';
import {SafeAreaView, View, Text, FlatList} from 'react-native'
import Row from'./rowHistorique';
import Appel from './PageAppel';
import styles from '../style';

const DATA = [
    {
        id: 1,
        nomUE : 'Java Avancé',
        type :'TD',
        nomFiliere : 'L3 II',
        numGroup : 1,
        dateSeance : '13-07-2020',
        creneau : '13h-15h'
    },
    {
        id: 2,
        nomUE : 'C Avancé',
        type :'TP',
        nomFiliere : 'L3 II',
        numGroup : 2,
        dateSeance : '14-07-2020',
        creneau : '15h30-17h30'
    },
    {
        id: 3,
        nomUE : 'Java Avancé',
        type :'TD',
        nomFiliere : 'L3 II',
        numGroup : 1,
        dateSeance : '14-07-2020',
        creneau : '15h30-17h30'
    },
];

export default class PageHistoriqueDesSeances extends Component{
    constructor(props){
        super(props);
        this.state = {
            idSeance : -1,
            data : null
        }
    }

    changeId = (id) => {
        this.setState({idSeance : id});
    }

    changeOnglet = (nom) => {
        this.props.navigation.navigate(nom);
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){ //temporaire
        this.setState({data: DATA});
    }

    render(){
        const renderItem = ({ item }) => (
            <Row 
                id = {item.id}
                title={item.nomUE} 
                type={item.type} 
                filiere={item.nomFiliere}
                groupe={item.numGroup}
                date={item.dateSeance}
                creneau={item.creneau}
                changeId={this.changeId}/>
        );

        if(this.state.idSeance<0){
            return (
                <View> 
                    <Text style={styles.title}>Historique des séances</Text>
                    <SafeAreaView>
                        <FlatList
                            data={this.state.data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                </View>
            );
        }else {
            return (
                <Appel 
                    id={this.state.idSeance} 
                    changeId={this.changeId} 
                    changeOnglet={this.changeOnglet}
                />
            );
        }
    }
}