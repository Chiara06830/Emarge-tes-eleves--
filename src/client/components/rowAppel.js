import React from 'react';
import {TouchableOpacity, Text, TextInput, Image} from 'react-native';
import styles from '../style';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { CheckBox } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class Row extends React.Component{
    constructor(props){
        super(props);
        this.radio_props = [
            {label: 'Abscent', value: 2 },
            {label: 'Abscence justifié', value: 3 },
            {label: 'Covid', value:4}
        ];
        this.state = {
            commentaire : "",
            visible : false,
            checked : false,
            value: 2
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
        fetch(`http://localhost:5600/getCommentaire?idSenace=${this.props.idSeance}&idEtudiant=${this.props.id}`)
            .then(res => res.json())
            .then(res => {
                if(res[0].commentaire != null){
                    console.log(res[0].commentaire);
                    this.setState({commentaire : res.commentaire});
                }  
            })
            .catch(err =>{
                if(err) throw err;
            });
    }

    fetchCom() {
        this.setState({ visible: false });
        fetch(`http://localhost:5600/commentaire?idSenace=${this.props.idSeance}&idEtudiant=${this.props.id}&commentaire=${this.state.commentaire}`)
            .catch(err =>{
                if(err) throw err;
            });
    }

    //Gestion des presence
    getPresence(){
        fetch(`http://localhost:5600/getPresence?idSeance=${this.props.idSeance}&idEtudiant=${this.props.id}`)
            .then(res => res.json())
            .then(res => {
                if(res[0].unTypeParticipation === 1) this.setState({checked : true});
                else this.setState({checked : false});
            })
            .catch(err =>{
                if(err) throw err;
            });
    }

    fetchPresence() {
        let val = this.state.checked ? this.state.value : 1;
        console.log(val);
        fetch(`http://localhost:5600/presence?idSeance=${this.props.idSeance}&idEtudiant=${this.props.id}&valeur=${val}`)
            .catch(err =>{
                if(err) throw err;
            });
    }

    render(){
        const photo = this.props.photo === null ? 'profil.PNG' : this.props.photo;
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => {
                    this.setState({ visible: true });
                }}
            >
                <Text>{this.props.nom} {this.props.prenom}
                <CheckBox
                    checked={this.state.checked}
                    onPress={() => this.fetchPresence()}
                /></Text>
                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                >
                    <DialogContent>
                        <Image source={require('./img/' + photo)} style={{width:60, height:60}} />
                        <Text>{this.props.nom}</Text>
                        <Text>{this.props.prenom}</Text>
                        <CheckBox
                            checked={this.state.checked}
                            onPress={() => {this.setState({checked: !this.state.checked});this.fetchPresence()}}
                        />
                        <RadioForm
                            radio_props={this.radio_props}
                            initial={0}
                            formHorizontal={true}
                            labelHorizontal={false}
                            buttonColor={'#2196f3'}
                            animation={true}
                            onPress={(value) => {this.setState({value:value}); this.fetchPresence()}}
                        />
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
                            onPress={() => this.fetchCom()}
                        />
                    </DialogFooter>
                </Dialog>
                
            </TouchableOpacity>
        );
    }
}