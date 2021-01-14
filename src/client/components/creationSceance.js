import React, { Component } from 'react';
import { format } from "date-fns";
import { TouchableOpacity, View, Text, TextInput, Picker, Image, Button } from 'react-native'
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
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
            listeGroupePicker: [],
            menuCreationUE: false,
            nomNouvelleUE: ''
        }
    }

    creationSeance() {
        const creneau = this.state.debut + " - " + this.state.fin;
        const date2 = Date.parse(this.state.date);
        const formatDate = format(date2, "yyyy-MM-dd"); 
        fetch(`http://localhost:5600/creationSeance?nomUE=${this.state.nomUE}&typeDeCours=${this.state.typeDeCours}&groupe=${this.state.groupe}&date=${formatDate}&creneau=${creneau}&id=${this.props.id}`)
            .then(res => res.json())
            .then(res => {
                
            })
            .catch(err =>{
                if(err) throw err;
            });
    }

    creationUE() {
        console.log(this.state.nomNouvelleUE);
        fetch(`http://localhost:5600/creationUE?nomUE=${this.state.nomNouvelleUE}&idEnseignant=${this.props.id}`)
            .then(res => res.json())
            .then(res => {
                this.acquisitionDesUE();
            })
            .catch(err =>{
                if(err) throw err;
            });
    }

    deconnexion() {
        this.props.changeId(-1);
        this.props.changeEtat('connexion');
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
        fetch(`http://localhost:5600/selectionGroupe?id=${this.props.id}`)
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
            <View>
                <View style={theme.placementButtonDeconnexion}>
                    <Button color={theme.buttonDeconnexion} onPress={() => this.deconnexion()} title="DECONNEXION"/>
                </View>
                <View style={theme.container}>
                    <View style={theme.container3}>
                        <Text style={theme.title}>Création d'une séance{"\n"}</Text>
                        <Text style={theme.title2}>Choix de l'UE</Text>
                    </View>
                    <View style={theme.container4}>
                        <Text style={theme.texte}>Nom de l'UE :</Text>
                        <View style={theme.containerViewRow}>
                            <Picker
                                style={{width: '80%'}}
                                selectedValue={this.state.nomUE}
                                onValueChange={(itemValue) => this.setState({nomUE: itemValue})}
                            >
                                {this.state.listeUEPicker}
                            </Picker>
                            {/*<Button onPress={() => this.setState({menuCreationUE: !menuCreationUE})} icon={<Icon name="arrow-right" size={15} color="white"/>}/>*/}
                            <TouchableOpacity onPress={() => this.setState({menuCreationUE: !this.state.menuCreationUE})}>
                                <Image source={require('./icons/ajout.png')} style={{width:30, height:30}}/>
                            </TouchableOpacity>
                            <Dialog style={theme.popupAjouterUE} visible={this.state.menuCreationUE} onTouchOutside={() => { this.setState({ menuCreationUE: false }); }}>
                                <DialogContent>
                                    <View style={theme.container2}>
                                        <Text>Création d'une nouvelle UE</Text>
                                        <TextInput style={theme.input2} type="text" placeholder='Nom de la nouvelle UE'
                                            onChangeText={(value) => this.setState({nomNouvelleUE: value})}
                                            value={this.state.nomNouvelleUE}
                                        />
                                    </View>
                                </DialogContent>
                                <DialogFooter>
                                    <DialogButton
                                        text="Retour"
                                        onPress={() => {
                                            this.setState({ menuCreationUE: false });
                                        }}
                                    />
                                    <DialogButton
                                        text="Valider"
                                        onPress= {() => {
                                            this.setState({ menuCreationUE: false });
                                            this.creationUE()}
                                        }
                                    />
                                </DialogFooter>
                            </Dialog>
                        </View>
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
                            <Button color={theme.buttonColor} onPress={() => this.creationSeance()} title="CREATION"/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default PageCreationUneSeance;
