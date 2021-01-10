import React from 'react';
import {TouchableOpacity, Text, TextInput, Image, View} from 'react-native';
import styles from '../style';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { CheckBox } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class Row extends React.Component{
    constructor(props){
        super(props);
        this.radio_props = [
            {label: 'Abscent', value: 0 },
            {label: 'Abscence justifié', value: 1 },
            {label: 'Covid', value:2}
        ];
        this.state = {
            commentaire : "plop",
            visible : false,
            checked : false,
            value: 0
        }
    }

    setCommentaire(text) {this.setState({commentaire : text})}

    //---------COMMUNICATION AVEC LE BACK---------//

    componentDidMount(){
        this.getCom();
        this.getPresence();
    }

    //Gestion des commentaire
    getCom(){
        fetch(`http://localhost:5700/getCommentaire?idSenace=${this.props.idSeance}&idEtudiant=${this.props.id}`)
            .then(res => res.json())
            .then(res => {
                if(res[0].commentaire != null){
                    console.log("**" + this.props.nom + " - " + res[0].commentaire);
                    this.setState({commentaire : res.commentaire});
                    console.log("--" + this.props.nom + " - " + this.state.commentaire);
                }  
            })
            .catch(err =>{
                if(err) throw err;
            });
    }

    fetchCom() {
        this.setState({ visible: false });
        if(this.state.commentaire != undefined){
            fetch(`http://localhost:5700/commentaire?idSenace=${this.props.idSeance}&idEtudiant=${this.props.id}&commentaire=${this.state.commentaire}`)
                .catch(err =>{
                    if(err) throw err;
                });
        }
        
    }

    //Gestion des presence
    getPresence(){
        fetch(`http://localhost:5700/getPresence?idSeance=${this.props.idSeance}&idEtudiant=${this.props.id}`)
            .then(res => res.json())
            .then(res => {
                if(res[0].unTypeParticipation === 1) this.setState({checked : true});
                else {
                    this.setState({checked : false});
                    this.setState({value : res[0].unTypeParticipation-2});
                }
            })
            .catch(err =>{
                if(err) throw err;
            });
    }

    fetchPresence() {
        let val = !this.state.checked ? (this.state.value + 2) : 1;
        fetch(`http://localhost:5700/presence?idSeance=${this.props.idSeance}&idEtudiant=${this.props.id}&valeur=${val}`)
            .catch(err =>{
                if(err) throw err;
            });
    }

    render(){
        console.log(this.props.nom + " - " + this.state.commentaire);
        const photo = this.props.photo === null ? 'profil.PNG' : this.props.photo;
        const radio = this.state.checked ? <View></View> : (
            <RadioForm
            formHorizontal={false}
            animation={true}
            >{
                this.radio_props.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i} accessible={false}>
                    <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={this.state.value === i}
                        onPress={(value) => this.setState({value:value})}
                        borderWidth={1}
                        buttonInnerColor={'#000000'}
                        buttonOuterColor={this.state.value === i ? '#000000' : '#000'}
                        buttonSize={10}
                        buttonOuterSize={20}
                        buttonWrapStyle={{marginLeft: 10}}
                    />
                    <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={false}
                        onPress={(value) => this.setState({value:value})}
                        labelStyle={{fontSize: 20, color: '#000000'}}
                    />
                </RadioButton>
                ))
            }
        </RadioForm>
        );
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => {
                    this.setState({ visible: true });
                }}
            >
                <View style={styles.containerViewRow}>
                    <Text>{this.props.nom} {this.props.prenom}</Text>
                    <CheckBox
                        checkedColor='black'
                        checked={this.state.checked}
                        onPress={() => {this.setState(({checked : !this.state.checked}), () => this.fetchPresence());}}
                    />
                </View>
                
                {/* PopUp */}
                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                >
                    <DialogContent>
                        <View style={styles.containerViewRow}>
                            <Image source={require('./img/' + photo)} style={{width:60, height:60}} />
                            <View>
                                <Text>{this.props.nom}</Text>
                                <Text>{this.props.prenom}</Text>
                            </View>
                        </View>
                        
                        <CheckBox
                            title='Présent'
                            checkedColor='black'
                            checked={this.state.checked}
                            onPress={() => this.setState({checked: !this.state.checked})}
                        />
                        {radio}
                        <TextInput style={styles.textArea} type="text" placeholder='Commentaire'
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(text) => this.setCommentaire(text)}
                            value={this.state.commentaire}
                        />
                    </DialogContent>
                    <DialogFooter>
                        <DialogButton
                            text="Retour"
                            onPress={() => {
                                this.setState({ visible: false });
                            }}
                        />
                        <DialogButton
                            text="Valider"
                            onPress={() => {this.fetchCom(); this.fetchPresence();}}
                        />
                    </DialogFooter>
                </Dialog>
                
            </TouchableOpacity>
        );
    }
}