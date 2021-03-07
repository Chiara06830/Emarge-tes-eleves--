import React, { Component } from 'react';
import { View, Text, Button, TextInput} from 'react-native';
import theme from '../style';
import CasClient, { constant } from "react-cas-client";

class PageConnexionCAS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            etat: props.changeEtat
        }
    }

    render() {
        let casEndpoint = "cas.univ-brest.fr";
        let casOptions = { version: constant.CAS_VERSION_2_0 };
 
        let casClient = new CasClient(casEndpoint, casOptions);

        return(
            casClient
                .auth()
                .then(successRes => {
                    console.log(successRes);
                    this.state.etat('connexion');
                })
                .catch(errorRes => {
                    console.error(errorRes);
                })
        )
    }

}

export default PageConnexionCAS;