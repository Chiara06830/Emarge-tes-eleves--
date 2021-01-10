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

    formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0],
        month = datePart[1], day = datePart[2];

        return day+'/'+month+'/'+year;
    }

    render(){
<<<<<<< Updated upstream
        const nom = "" + this.props.title + "-" + this.props.type + "-" + this.props.filiere + " G" + this.props.groupe + "\n"
            + this.formatDate(this.props.date.split("T")[0]) + " (" + this.props.creneau + ")";
=======
        const nom1 = "" + this.props.title + "-" + this.props.type + "-" + this.props.filiere + " G" + this.props.groupe;
        const nom2 = this.props.date + "(" + this.props.creneau + ")"
>>>>>>> Stashed changes
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => this.props.changeId(this.props.id)}
            >
<<<<<<< Updated upstream
                <Text style={{fontSize: 20}}>{nom}</Text>
=======
                <View style={styles.espace}>
                    <Text>{nom1}</Text>
                    <Text>{nom2}</Text>
                </View>
>>>>>>> Stashed changes
            </TouchableOpacity>
        );
    }
}