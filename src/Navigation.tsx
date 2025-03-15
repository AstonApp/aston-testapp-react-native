import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import EducationScreen from './Education';

export type RootStackParamList = {
    Home: undefined;
    Education: { apiKey: string; integratorUserId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }} initialRouteName="Home">
                <Stack.Screen name="Home">
                    {() => <Home />}
                </Stack.Screen>
                <Stack.Screen name="Education">
                    {({ route }) => <EducationScreen apiKey={route.params?.apiKey} integratorUserId={route.params?.integratorUserId} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}