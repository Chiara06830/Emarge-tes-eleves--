import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from '../style';

export default class Row extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : props.changeId
        }
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('/');
    }

    render(){
        const nom = "" + this.props.title + "-" + this.props.type + "-" + this.props.filiere + " G" + this.props.groupe + "\n"
            + this.formatDate(this.props.date) + " (" + this.props.creneau + ")";
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => this.props.changeId(this.props.id)}
            >
                <Text>{nom}</Text>
            </TouchableOpacity>
        );
    }
}