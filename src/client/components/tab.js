import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PageCreationUneSeance from './creationSceance'
import PageHistoriqueDesSeances from './historiqueSceance'

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <NavigationContainer >
        <Tab.Navigator 
            screenOptions={
            ({route}) => ({
                    tabBarIcon : () => {
                        if(route.name === "Creation")
                            return <Image source={require('./icons/creation.png')} style={{width:20, height:20}} />
                        else if(route.name === "Hitorique"){
                            return <Image source={require('./icons/historique.png')} style={{width:20, height:20}} />
                        }
                    }
                })
            }
            tabBarOptions={{
            showIcon: true,
            showLabel: false,
            indicatorStyle: {
                height: 2,
                backgroundColor: "#FFF"
            },
            style:{
                backgroundColor: "#ffcc00",
                boderTopWidth: 1,
                borderColor: "#3f101c"
            }
            }}
        >
            <Tab.Screen name="Creation" component={PageCreationUneSeance}/>
            <Tab.Screen name="Hitorique" component={PageHistoriqueDesSeances}/>
        </Tab.Navigator>
        </NavigationContainer>
    );
}

export default class Onglet extends Component{
    render (){
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <Tabs changeEtat={this.props.changeEtat}/>
            </View>
        );
    }
}