import React, { Component } from 'react';
import { View, Text } from 'react-native'
import theme from '../style'

class PageErreur extends Component {
    
    render () {
        return (
            <View>
                <Text style={theme.title}>Une erreur c'est produite</Text>
            </View>
        )
    }
}

export default PageErreur;