import React, { Component } from 'react';
import { format } from "date-fns";
import { View, Text, Button, Picker } from 'react-native'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import theme from '../style'

class PageCreationUneSeance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nomUE: '1',
            typeDeCours: 'TP',
            groupe: '1',
            date: new Date(),
            debut: '10:00',
            fin: '12:00',
            listeUEPicker: [],
            listeGroupePicker: []
        }
    }

    creationSeance() {
        const creneau = this.state.debut + " - " + this.state.fin;
        const date2 = Date.parse(this.state.date);
        const formatDate = format(date2, "yyyy-MM-dd"); 
        fetch(`http://localhost:5700/creationSeance?nomUE=${this.state.nomUE}&typeDeCours=${this.state.typeDeCours}&groupe=${this.state.groupe}&date=${formatDate}&creneau=${creneau}&id=${this.props.id}`)
            .then(res => res.json())
            .then(res => {
                this.props.changeId(res.data);
                // changement de page si ok
                if(res.data != -1)
                    this.state.etat('sceance');
                else{
                    alert("L'identifiant/mot de passe est incorrect");
                }
            })
            .catch(err =>{
                if(err) throw err;
            });
    }

    acquisitionDesUE() {
        fetch(`http://localhost:5600/selectionUE?id=${this.props.id}`)
            .then(response => response.json())
            .then(response => { 
                var listeNomUE = [];
                var listeIdUE = [];
                var listeUE = response.data

                var i = 0;
                while (listeUE.length > i) {
                    listeIdUE[i] = "" + listeUE[i].idUE;
                    listeNomUE[i] = "" + listeUE[i].nomUE;
                    i++;
                }

                i = 0;
                let listeUEPicker2 = listeNomUE.map( (s, i) => {
                    return <Picker.Item key={i} label={s} value={listeIdUE[i++]} />
                });
                this.setState({listeUEPicker: listeUEPicker2})
            })
            .catch(err => console.error(err))
    }

    acquisitionDesGroupe() {
        fetch(`http://localhost:5700/selectionGroupe?id=${this.props.id}`)
            .then(response => response.json())
            .then(response => { 
                var listeIdGroupe = [];
                var listeIntituleGroupe = [];
                var listeGroupe = response.data;

                var i = 0;
                while (listeGroupe.length > i) {
                    listeIdGroupe[i] = "" + listeGroupe[i].idGroupe;
                    listeIntituleGroupe[i] = listeGroupe[i].nomFiliere + " - G" + listeGroupe[i].numGroupe;
                    i++;
                }

                i = 0;
                let listeGroupePicker2 = listeIntituleGroupe.map( (s, i) => {
                    return <Picker.Item key={i} label={s} value={listeIdGroupe[i++]} />
                });
                this.setState({listeGroupePicker: listeGroupePicker2})
            })
            .catch(err => console.error(err))
    }

    render() {
        if (this.state.listeUEPicker.length < 1) this.acquisitionDesUE();
        if (this.state.listeGroupePicker.length < 1) this.acquisitionDesGroupe();
        return(
            <View style={theme.container}>
                <View style={theme.container3}>
                    <Text style={theme.title}>Création d'une séance{"\n"}</Text>
                    <Text style={theme.title2}>Choix de l'UE</Text>
                </View>
                <View style={theme.container4}>
                    <Text style={theme.texte}>Nom de l'UE :</Text>
                    <Picker
                        style={{width: '100%'}}
                        selectedValue={this.state.nomUE}
                        onValueChange={(itemValue) => { this.setState({nomUE: itemValue}); console.log(itemValue) }}
                    >
                        {this.state.listeUEPicker}
                    </Picker>
                    <View style={theme.containerViewRow}>
                        <View>
                            <Text style={theme.texte}>{"\n"}Type de cours :          </Text>
                            <Picker
                                style={{width: '60%'}}
                                selectedValue={this.state.typeDeCours}
                                onValueChange={(itemValue) => this.setState({typeDeCours: itemValue})}
                            >
                                <Picker.Item label="TP" value="TP"/>
                                <Picker.Item label="TD" value="TD"/>
                                <Picker.Item label="Cours" value="Cours"/>
                            </Picker>
                        </View>
                        <View>
                            <Text style={theme.texte2}>{"\n"}Groupe :                       </Text>
                            <Picker
                                style={{width: '100%'}}
                                selectedValue={this.state.groupe}
                                onValueChange={(itemValue) => this.setState({groupe: itemValue})}
                            >
                                {/*<Picker.Item label="L3 II - G1" value="1"/>
                                <Picker.Item label="L3 II - G2" value="2"/>
                                <Picker.Item label="L3 IFA - G1" value="3"/>
                                <Picker.Item label="L3 IFA - G2" value="4"/>*/}
                                {this.state.listeGroupePicker}
                            </Picker>
                        </View>
                    </View>
                    <View style={theme.container3}>
                        <Text style={theme.title2}>{"\n"}Choix des horaires</Text>
                        <View style={theme.containerViewRow}>
                            <Text style={theme.texte2}>Date :   </Text>
                            <DatePicker
                                onChange={(date) => {this.setState({date: date})}}
                                value={this.state.date}
                            />
                        </View>
                        <View style={theme.containerViewRow}>
                            <View style={theme.decalerDroite}>
                                <Text style={theme.texte2}>Heure de début :   </Text>
                                <TimePicker
                                    onChange={(debut) => {this.setState({debut: debut})}}
                                    value={this.state.debut}
                                />
                            </View>
                            <View>
                                <Text style={theme.texte2}>Heure de fin :   </Text>
                                <TimePicker
                                    onChange={(fin) => {this.setState({fin: fin})}}
                                    value={this.state.fin}
                                />
                            </View>
                        </View>
                        <Button onPress={() => this.creationSeance()} title="Création"/>
                    </View>
                </View>
            </View>
        )
    }
}

export default PageCreationUneSeance;
