import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { validateEmail } from "../utils/validation";
import firebase from '../utils/firebase';

export default function LoginForm(props) {
    const { changeForm } = props;

    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const login = () => {
        let error = {};
        if (!formData.email || !formData.password) {
            console.log('error 1');
            if (!formData.email) error.email = true;
            if (!formData.password) error.password = true;
        }
        else if (!validateEmail(formData.email)) {
            console.log('error 2')
            error.email = true;
        }
        else {
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log("OK")
                }).catch(() => {
                    setFormError({
                        email: true, password: true
                    })
                })
        }

        setFormError(error);
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    return (
        <>
            <TextInput onChange={(e) => onChange(e, "email")} style={[styles.input, formError.email && styles.error]} placeholder="Correo Electrónico" placeholderTextColor="#969696" />
            <TextInput onChange={(e) => onChange(e, "password")} style={[styles.input, formError.password && styles.error]} placeholder="Contraseña" placeholderTextColor="#969696" secureTextEntry={true} />

            <TouchableOpacity onPress={login}>
                <Text style={styles.btnT}>Iniciar sesión</Text>
            </TouchableOpacity>

            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnT}>Registar</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

function defaultValue() {
    return {
        email: "",
        password: "",
    }
}

const styles = StyleSheet.create({
    btnT: {
        color: "#fff"
    },
    input: {
        height: 35,
        color: "#fff",
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040"
    },
    login: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 10,
        fontSize: 28
    },
    error: {
        borderColor: "#940c0c"
    }
});