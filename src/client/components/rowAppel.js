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
            visible : false
        }
    }

    setCommentaire(text) {this.setState({commentaire : text})}

    fetch() {
        this.setState({ visible: false });
        //+ ENVOIE DU COMMENTAIRE
    }

    render(){
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => {
                    this.setState({ visible: true });
                }}
            >
                <Text>{this.props.nom} {this.props.prenom}</Text>
                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                >
                    <DialogContent>
                        <Image source={require('./img/' + this.props.photo)} style={{width:60, height:60}} />
                        <Text>{this.props.nom}</Text>
                        <Text>{this.props.prenom}</Text>
                        <TextInput style={styles.textArea} type="text" placeholder='Commentaire'
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(text) => this.setCommentaire(text)}
                            value={this.state.identifiant} 
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
                            onPress={() => this.fetch()}
                        />
                    </DialogFooter>
                </Dialog>
                
            </TouchableOpacity>
        );
    }
}