import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Text} from 'react-native';
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
                backgroundColor: "#a2273C",
                boderTopWidth: 1,
                borderColor: "#3f101c"
            }
            }}
        >
            <Tab.Screen name="Creation" component={PageCreationUneSeance} />
            <Tab.Screen name="Hitorique" component={PageHistoriqueDesSeances} />
        </Tab.Navigator>
        </NavigationContainer>
    );
}

export default function Onglet() {
    return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <Tabs/>
            </View>
    );
}