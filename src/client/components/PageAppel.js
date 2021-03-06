import React, { Component } from 'react';
import {ActivityIndicator, Text, Button, View, ScrollView, SafeAreaView} from 'react-native';
import styles from '../style';
import Row from './rowAppel';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { MultipleSelectPicker } from 'react-native-multi-select-picker';


export default class PageAppel extends Component{
    constructor(props){
        super(props);
        this.presence = [];
        this.state = {
            data : null,
            dataTable: null,
            visible :false, //pour une popup
            selectedItems: [],
            items : null
        }
    }

    //----------------CHARGEMENT DES DONNEES----------------//
    componentDidMount(){
        this.fetchData();
        this.fetchItems();
    }

    //recupère infos du cours
    fetchData = () => {
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

    //récupère liste des élèves
    fetchItems = () =>{
        fetch(`http://localhost:5600/selection?idSeance=${this.props.id}`)
            .then(res => res.json())
            .then(res =>{
                //tri des etudiants par leurs nom de famille
                res.data.sort(function(a, b) {
                    var nameA = a.nomEtudiant.toUpperCase();
                    var nameB = b.nomEtudiant.toUpperCase();
                    if (nameA < nameB) {return -1;}
                    if (nameA > nameB) { return 1;}
                    return 0;  
                });
                this.setState({items : res.data});
            })
            .catch(err =>{
                if(err) throw err;
                
            })
    }

    //----------------FONCTIONNALITEES----------------//
    
    formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0],
        month = datePart[1], day = datePart[2];

        return day+'/'+month+'/'+year;
    }

    //ouverture de la popup d'ajout d'étudiant
    ajouterEtudiants(){
        this.setState({ visible: true });
        this.fetchItems();
    }

    //ajout d'un etudiant a la liste
    ajouterDataTable(){
        var studentAdded = [];
        for(var i =0; i<this.state.selectedItems.length; i++){
            studentAdded[i] = this.state.items[this.state.selectedItems[i].value-1].idEtudiant;
        }

        var id = this.props.id;
        for(var j=0;j<studentAdded.length;j++){
            fetch(`http://localhost:5600/ajoutEtudiant?idEtudiant=${studentAdded[j]}&idSeance=${id}`)
            .catch(err =>{
                if(err) throw err;
            });
        }  
    
        var studentAdded = [];
        for( i =0;i<this.state.dataTable.length;i++ ){
            studentAdded[i]=this.state.dataTable[i];

        }

        j = studentAdded.length ;
        for(i =0; i<this.state.selectedItems.length; i++){
            studentAdded[j] = this.state.items[this.state.selectedItems[i].value-1];
            j++;

        }
            
        this.setState({dataTable : studentAdded});
        this.setState({visible:false});
    }

    //retourner à l'historique
    valider(){
        this.props.changeIdSeance(-1);
        this.fetchData();
        this.props.charger();
    }

    render(){
        var itemsPicker = [];
        
        if(this.state.items != null){
            for(var i=0; i<this.state.items.length;i++){
                itemsPicker[i] = {label : this.state.items[i].nomEtudiant+" "+this.state.items[i].prenomEtudiant, value : i + 1};
            }
        }

        if(this.state.data != null && this.state.dataTable != null){
            //tri des etudiants par leurs nom de famille
            this.state.dataTable.sort(function(a, b) {
                var nameA = a.nomEtudiant.toUpperCase();
                var nameB = b.nomEtudiant.toUpperCase();
                if (nameA < nameB) {return -1; }
                if (nameA > nameB) { return 1;}
                return 0;  
            });

            return (
                <View style={styles.container5}>
                    <Text style={styles.title}>UE {this.state.data.nomUE}</Text>
                    <Text><Text style={{fontWeight: "bold"}}>Type de cours :</Text> {this.state.data.type}</Text>
                    <Text><Text style={{fontWeight: "bold"}}>Groupe :</Text> {this.state.data.nomFiliere} - G{this.state.data.numGroup}</Text>
                    <Text><Text style={{fontWeight: "bold"}}>Date :</Text> {this.formatDate(this.state.data.dateSeance.split("T")[0])}</Text>
                    <Text><Text style={{fontWeight: "bold"}}>Enseignant :</Text> {this.state.data.prenomEnseignant} {this.state.data.nomEnseignant}</Text>
                    <SafeAreaView style={styles.container}>
                    {/* Liste des étudiants */}
                    <ScrollView style={styles.scrollView}>
                        {
                            this.state.dataTable.map((item, index) => (
                                <Row 
                                    key={item.idEtudiant}
                                    id = {item.idEtudiant}
                                    nom = {item.nomEtudiant}
                                    prenom = {item.prenomEtudiant}
                                    presence = {item.presence}
                                    photo = {item.photo}
                                    idSeance={this.props.id}
                                    setData  = {this.fetchData}/>
                            ))
                        }
                    </ScrollView>
                    </SafeAreaView>

                    {/* boutons de gestion*/}
                    <Button color={styles.buttonColor} title="Ajouter des étudiants" onPress={() => this.ajouterEtudiants()}  />
                    <Button color={styles.buttonColor} title="Valider" onPress={() => this.valider()}/>

                    {/* Popup de gestion des abscence */}
                    <Dialog
                        visible={this.state.visible}
                        onTouchOutside={() => {
                            this.setState({ visible: false });
                        }}
                    >
                        <DialogContent style={styles.container5}>
                            <View style={styles.container5}>
                                <Text>Etudiants de la promotion :  </Text>
                                <SafeAreaView style={styles.container}>
                                <ScrollView style={styles.scrollView}>
                                <MultipleSelectPicker 
                                    items = {itemsPicker}
                                    onSelectionsChange={(e) => { this.setState({ selectedItems: e }) }}
                                    selectedItems={this.state.selectedItems}
                                    buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                                    buttonText='hello'
                                    checkboxStyle={{ height: 20, width: 20 }}
                                />
                                </ScrollView>
                                </SafeAreaView>

                            </View>                            
                        </DialogContent>

                        <DialogFooter>
                            <DialogButton
                                text="Retour"
                                onPress={() => {
                                    this.setState({visible: false});
                                }}
                            >                   
                            </DialogButton>

                            <DialogButton
                                text="Valider"
                                onPress={() => this.ajouterDataTable()}
                            >
                            </DialogButton>
                        </DialogFooter>
                    </Dialog>
                </View>
            );
        }else { // si les données ne sont pas encore charger
            return(
                <ActivityIndicator size="large" color="#ffcc00"/>
            );
        }
    }
}