import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import firebase from '../utils/firebase';
import UsrMail from './RegisterForm';

export default function home(props) {
    const { email } = props;
    return (
        <View>
            <Text style={styles.txt}> Pagina de inicio </Text>
            <Text style={styles.txt}>{`Bienvenido ${email}`}</Text>
            <Logout />
        </View>
    )
}

function Logout() {
    const logout = () => {
        firebase.auth().signOut();
    }
    return (
        <View>
            <Text>estás dentro</Text>
            <Button title="cerrar sesión" onPress={logout}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        color: "#fff",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 28
    }
})
