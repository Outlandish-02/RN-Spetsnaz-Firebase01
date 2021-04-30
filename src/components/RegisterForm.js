import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { validateEmail } from '../utils/validation';
import firebase from '../utils/firebase';

export default function RegisterForm(props) {

    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const register = () => {

        let error = {};

        if (!formData.email || !formData.password || !formData.confirmPass) {
            if (!formData.email) error.email = true;
            if (!formData.password) error.password = true;
            if (!formData.confirmPass) error.confirmPass = true;
        }
        else if (!validateEmail(formData.email)) {
            error.email = true;
        }
        else if (formData.password !== formData.confirmPass) {
            error.password = true;
            error.confirmPass = true;
        }
        else if (formData.password.length < 6) {
            error.password = true;
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log('cuenta creada')
                }).catch(() => {
                    setFormError({
                        email: true,
                        password: true,
                        confirmPass: true
                    });
                });
        }

        setFormError(error);
        console.log(formData.email, formData.password, formData.confirmPass);

    }

    return (
        <>
            <TextInput onChange = {(e)=>setFormData({...formData, email: e.nativeEvent.text})} style={[styles.input, formError.email && styles.error]} placeholder="Correo Electronico" placeholderTextColor="#969696" />
            <TextInput onChange = {(e)=>setFormData({...formData, password: e.nativeEvent.text})} style={[styles.input, formError.password && styles.error]} placeholder="Contraseña" placeholderTextColor="#969696" />
            <TextInput onChange = {(e)=>setFormData({...formData, confirmPass: e.nativeEvent.text})} style={[styles.input, formError.confirmPass && styles.error]} placeholder="Confirmar contraseña" placeholderTextColor="#969696" />

            <TouchableOpacity>
                <Text onPress={register} style={styles.btnTxt}>Registrar</Text>
            </TouchableOpacity>

            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnTxt}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

function defaultValue() {
    return {
        email: {},
        password: {},
        confirmPass: {}
    }
}

const styles = StyleSheet.create({
    btnTxt: {
        color: '#fff',
        fontSize: 20,
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

