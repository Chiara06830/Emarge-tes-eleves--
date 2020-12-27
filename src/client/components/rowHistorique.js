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

    formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0],
        month = datePart[1], day = datePart[2];
      
        return day+'/'+month+'/'+year;
      }

    render(){
        const nom = "" + this.props.title + "-" + this.props.type + "-" + this.props.filiere + " G" + this.props.groupe + "\n"
            + this.formatDate(this.props.date.split("T")[0]) + " (" + this.props.creneau + ")";
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