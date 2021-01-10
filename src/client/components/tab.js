import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PageCreationUneSeance from './creationSceance'
import PageHistoriqueDesSeances from './historiqueSceance'

const Tab = createBottomTabNavigator();

class Tabs extends Component {
    render () {
        return (
            <NavigationContainer>
            <Tab.Navigator 
                screenOptions={
                ({route}) => ({
                        tabBarIcon : () => {
                            if(route.name === "Creation")
                                return <Image source={require('./icons/creation.png')} style={{width:20, height:20}} />
                            else if(route.name === "Historique"){
                                return <Image source={require('./icons/historique.png')} style={{width:20, height:20}} />
                            }
                        }
<<<<<<< Updated upstream
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
                <Tab.Screen name="Creation" children={()=><PageCreationUneSeance id={this.props.id}/>}/>
                <Tab.Screen name="Hitorique" children={()=><PageHistoriqueDesSeances id={this.props.id}/>}/>
            </Tab.Navigator>
            </NavigationContainer>
        );
    }
    
=======
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
            <Tab.Screen name="Historique" component={PageHistoriqueDesSeances}/>
        </Tab.Navigator>
        </NavigationContainer>
    );
>>>>>>> Stashed changes
}

export default class Onglet extends Component{
    render (){
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <Tabs id={this.props.id}/>
            </View>
        );
    }
}