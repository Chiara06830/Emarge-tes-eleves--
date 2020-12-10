import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from '../style';

export default class Row extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : props.changeId
        }
    }

    render(){
        const nom = "" + this.props.title + "-" + this.props.type + "-" + this.props.filiere + " G" + this.props.groupe + "\n"
            + this.props.date + "(" + this.props.creneau + ")";
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => this.state.id(this.props.id)}
            >
                <Text>{nom}</Text>
            </TouchableOpacity>
        );
    }
}