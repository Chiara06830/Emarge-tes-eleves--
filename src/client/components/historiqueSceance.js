import React, { Component } from 'react';
import {SafeAreaView, View, Text, Button, ScrollView, ActivityIndicator} from 'react-native'
import Row from'./rowHistorique';
import Appel from './PageAppel';
import styles from '../style';

export default class PageHistoriqueDesSeances extends Component{
    constructor(props){
        super(props);
        this.state = {
            idSeance : this.props.idSeance,
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
                for(let i=0; i<res.length; i++){
                    var dateParts = res[i]["dateSeance"].split("-");
                    res[i]["dateSeance"] = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
                }
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
        console.log(this.props.idSeance);
        if(this.state.idSeance<0 && this.state.data != null){
            this.state.data.sort((a,b)=>b.dateSeance.getTime()-a.dateSeance.getTime());
            return (
                <View style={styles.container}>
                    <View style={styles.placementButtonDeconnexion}>
                        <Button color={styles.buttonDeconnexion} onPress={() => this.deconnexion()} title="DECONNEXION"/>
                    </View>
                    <Text style={styles.title}>Historique des séances</Text>
                    <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        {
                            this.state.data.map((item, index) => (
                                <Row 
                                    id = {item.id}
                                    title={item.nomUE} 
                                    type={item.type} 
                                    filiere={item.nomFiliere}
                                    groupe={item.numGroup}
                                    date={item.dateSeance}
                                    creneau={item.creneau}
                                    changeId={this.changeId}/>
                            ))
                        }
                    </ScrollView>
                    </SafeAreaView>
                </View>
            );
        }else if(this.state.idSeance>0 && this.state.data != null){
            return (
                <Appel 
                    id={this.state.idSeance} 
                    changeId={this.changeId} 
                    changeOnglet={this.changeOnglet}
                />
            );
        }else {
            return(
                <ActivityIndicator size="large" color="#ffcc00"/>
            );
        }
    }
}