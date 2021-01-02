import React from 'react';
import {TouchableOpacity, Text, TextInput, Image} from 'react-native';
import styles from '../style';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { CheckBox } from 'react-native-elements';

export default class Row extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            commentaire : "",
            visible : false,
            checked : false
        }
    }

    setCommentaire(text) {this.setState({commentaire : text})}

    componentDidMount(){
        this.getCom();
    }

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
        //envoie commentaire
        fetch(`http://localhost:5600/commentaire?idSenace=${this.props.idSeance}&idEtudiant=${this.props.id}&commentaire=${this.state.commentaire}`)
            .catch(err =>{
                if(err) throw err;
            });
    }

    render(){
        const photo = this.props.photo == null ? 'profil.PNG' : this.props.photo;
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
                    onPress={() => this.setState({checked: !this.state.checked})}
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