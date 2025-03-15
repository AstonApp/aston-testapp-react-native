import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, Text, StyleSheet, Platform, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "./Navigation";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Index() {
    const [apiKey, setApiKey] = useState("")
    const [integratorUserId, setIntegratorUserId] = useState("")
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const onTap = () => {
        navigation.navigate('Education', { apiKey, integratorUserId });
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>Aston SDK TestApp!</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setApiKey}
                        value={apiKey}
                        placeholder="API KEY"
                        placeholderTextColor='gray'
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={setIntegratorUserId}
                        value={integratorUserId}
                        placeholderTextColor='gray'
                        placeholder="Integrator User ID"
                    />
                    <Button title="Open SDK" onPress={onTap} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        paddingVertical: 16,
        paddingHorizontal: Platform.OS === "web" ? 8 : 16,
        marginVertical: 'auto',
    },
    contentContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    text: {
        fontSize: 24,
        marginBottom: 8
    },
    input: {
        width:'100%',
        borderWidth: 1.5,
        borderColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 10,
        fontSize: 16,
        color: 'gray',
        ...(Platform.OS === 'web' && {
            outlineStyle: 'none',
        }),
    }
});