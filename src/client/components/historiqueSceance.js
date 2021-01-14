import React, { Component } from 'react';
import {SafeAreaView, View, Text, FlatList, Button} from 'react-native'
import Row from'./rowHistorique';
import Appel from './PageAppel';
import styles from '../style';

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

    fetchData(){
        fetch(`http://localhost:5600/historique?id=${this.props.id}`)
            .then(res => res.json())
            .then(res => {
                this.setState({data: res});
            })
            .catch(err =>{
                if(err) throw err;
            });
    }

    deconnexion() {
        this.props.changeId(-1);
        this.props.changeEtat('connexion');
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
                    <View style={styles.placementButtonDeconnexion}>
                        <Button color={styles.buttonDeconnexion} onPress={() => this.deconnexion()} title="DECONNEXION"/>
                    </View>
                    <View style={styles.container5}> 
                        <Text style={styles.title}>Historique des séances</Text>
                        <SafeAreaView>
                            <FlatList
                                data={this.state.data}
                                renderItem={renderItem}
                                keyExtractor={item => item.nom}
                            />
                        </SafeAreaView>
                    </View>
                </View>     
            );
        }else {
            return (
                <View>
                    <View style={styles.placementButtonDeconnexion}>
                        <Button color={theme.buttonDeconnexion} onPress={() => this.deconnexion()} title="DECONNEXION"/>
                    </View>
                    <Appel 
                        id={this.state.idSeance} 
                        changeId={this.changeId} 
                        changeOnglet={this.changeOnglet}
                    />
                </View>
            );
        }
    }
}