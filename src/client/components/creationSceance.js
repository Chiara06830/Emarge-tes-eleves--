import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native'
import DatePicker from 'react-native-datepicker'
import theme from '../style'
//import { MuiPickersUtilsProvider } from '@material-ui/pickers';
//import DateFnsUtils from '@date-io/date-fns';

//import DropDownPicker from 'react-native-dropdown-picker';

class PageCreationUneSeance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nomUE: 'Java',
            typeDeCours: 'TP',
            groupe: 'L3 II - G1',
            date:"15/10/2016"
        }
    }

    render() {

        return(
            <View style={theme.container}>
                <View style={theme.container3}>
                    <Text style={theme.title}>Création d'une séance{"\n"}</Text>
                    <Text style={theme.title2}>Choix de l'UE</Text>
                </View>
                <View style={theme.container4}>
                    <Text style={theme.texte}>Nom de l'UE :</Text>
                    <Picker
                        style={{width: '100%'}}
                        selectedValue={this.state.nomUE}
                        onValueChange={(itemValue) => this.setState({nomUE: itemValue})}
                    >
                        <Picker.Item label="Java" value="Java"/>
                        <Picker.Item label="C" value="C"/>
                        <Picker.Item label="Math" value="Math"/>
                        <Picker.Item label="Anglais" value="Anglais"/>
                    </Picker>
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
                                <Picker.Item label="L3 II - G1" value="L3 II - G1"/>
                                <Picker.Item label="L3 II - G2" value="L3 II - G2"/>
                                <Picker.Item label="L3 IFA - G1" value="L3 IFA - G1"/>
                                <Picker.Item label="L3 IFA - G2" value="L3 IFA - G2"/>
                            </Picker>
                        </View>
                    </View>
                    <View style={theme.container3}>
                        <Text style={theme.title2}>{"\n"}Choix des horaires</Text>
                        <View style={theme.containerViewRow}>
                            <Text style={theme.texte2}>Date :   </Text>
                            <DatePicker
                                mode="date"
                                placeholder="select date"
                                format="DD/MM/YYYY"
                                date={this.state.date}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default PageCreationUneSeance;
