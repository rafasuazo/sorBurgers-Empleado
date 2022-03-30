import React, {useState} from "react";
import { StyleSheet, View, TextInput, Text,  Button, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";

export default function RecuperarContrasenia({navigation}){

    // hooks
    const [correo, setCorreo] = useState('');
    const [pin, setPin] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [editable, setEditable] = useState(false);
    const [bool, setBool] = useState(false);

    const terms = "Al usar SorBurgers-app acepta nuestros términos y condiciones.";

    const pressHandler = async () => {

        if(correo.length <= 0){
            Alert.alert("SorBurgers", "El correo es necesario como medio de recuperacíon de su contraseña");
        }
        else{

            try{

                const respuesta = await fetch(
                    'http://192.168.0.9:3003/api/autenticacion/recuperarContrasenia',
                    {
                        method: 'POST',
                        headers:{
                            Accept: "application/json",
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            correo: correo
                        })
                    }
                );

                const json = await respuesta.json();
                console.log(json);

                if(Object.values(json.msj)){
                    Alert.alert("Pin enviado", "Revisa tu correo, el pin ha sido enviado", [
                        {text: "Entendido"}
                    ]);

                    setBool(true);
                    setEditable(true);
                }
            }
            catch(err){
                console.log(err);
            }
        }
    }

    const confirmacion = async () => {

        if(bool){
            try{
                const recuperacion = await fetch(
                    'http://192.168.0.183:3003/api/autenticacion/comprobarPin?id=1',
                {
                    method: 'PUT',
                    headers:{
                        Accept: "application/json",
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        pin: pin,
                        contrasenia: contrasenia,
                        confirmar: confirmar
                    })
                });

                const res = await recuperacion.json();
                console.log(res);

                if(res.msj === "Las contraseñas no son iguales"){
                    Alert.alert("SorBurgers", res.msj);
                }
                else{
                    navigation.navigate('Login');
                }
            }
            catch(err){
                console.log(err);
            }
        }
    }

    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <View style={styles.recuperacion}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Olvidé mi contraseña</Text>
                    </View>

                    <View style={styles.inputsContainer}>
                        <View style={styles.controls}>
                            <TextInput 

                            style={styles.comings}
                            placeholder="Correo electrónico"
                            placeholderTextColor={"#E4DBD9"}
                            autoCapitalize={'none'}
                            keyboardType={"email-address"}
                            onChangeText={(val) => setCorreo(val)}
                            />

                            <TextInput 

                            style={styles.comings}
                            placeholder="Pin de recuperación"
                            placeholderTextColor={"#E4DBD9"}
                            autoCapitalize={'none'}
                            keyboardType={"numeric"}
                            onChangeText={(val) => setPin(val)}
                            />

                            <TextInput 

                            style={styles.comings}
                            placeholder="Nueva contraseña"
                            editable={editable}
                            placeholderTextColor={"#E4DBD9"}
                            secureTextEntry={true}
                            passwordRules=''
                            autoCapitalize={'none'}
                            onChangeText={(val) => setContrasenia(val)}
                            />

                            <TextInput 

                            style={styles.comings}
                            placeholder="Confirmar contraseña"
                            editable={editable}
                            placeholderTextColor={"#E4DBD9"}
                            secureTextEntry={true}
                            passwordRules=''
                            autoCapitalize={'none'}
                            onChangeText={(val) => setConfirmar(val)}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.buttons}>
                            <Button title="Enviar correo" onPress={pressHandler} />
                        </View>

                        <View style={styles.buttons}>
                            <Button title="Confirmar" onPress={confirmacion} />
                        </View>
                    </View>

                    <View style={styles.terms}>
                        <Text style={{color: "#E4D8D9", textAlign: "center"}}>{terms}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111B1E",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    recuperacion: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "15%"
    },
    titleContainer: {
        padding: 25,
        alignItems: "stretch",
        justifyContent: "center"
    },
    title: {
        color: "#E4DBD9", 
        fontSize: 36,
        textAlign: "center"
    },
    inputsContainer: {
        marginTop: "5%",
        padding: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    controls: {
        padding: 15,
        paddingHorizontal: "10%"
    },
    comings: {
        width: 300,
        padding: 15,
        marginBottom: "10%",
        fontSize: 18,
        color: "#E4DBD9",
        backgroundColor: "#2F4C58",
        borderRadius: 10
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row"
    },
    buttons:{
        padding: 5
    },
    terms:{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 15,
        paddingBottom: 20,
        width: "100%"
    }
})