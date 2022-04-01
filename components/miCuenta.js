import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../assets/SorBurgers.jpg";
const ip = require("../ip/ip");

export default function MiCuenta({navigation}){

    // hooks
    const [id, setId] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [isLoading, setLoading] = useState(true);

    // extraer datos de la api
    const getUsuario = async () => {

        try{
            
            let usuario = JSON.parse(await AsyncStorage.getItem('userEmpleado'));

            if(!usuario){
                console.log("No existe el usuario");
                setId(null);
            }
            else{

                try{
                    setCorreo(usuario.info.correo);
                    setId(usuario.info.empleadoId);
                }
                catch(err){
                    console.log(err);
                }
                finally{
                    setLoading(false);
                }
            }
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsuario();
    }, []);

    // modificar el usuario
    const pressHandler = async () => {

        try{

            const respuesta = await fetch(ip.ip + "usuarios/modificar/empleado?id=" + id,
            {
                method: 'PUT',
                headers:{
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    correo: correo,
                    contrasenia: contrasenia,
                    confirmar: confirmar
                })
            });

            const json = await respuesta.json();
            console.log(json);

            if(json.errors){
                json.errors.forEach((error) => {
                    Alert.alert("SorBurgers", error.msg);
                })
            }
            else{

                if(respuesta.msj == "Las contraseñas no son iguales"){
                    Alert.alert("SorBurgers", respuesta.msj);
                }
                else{

                    navigation.navigate('MenuPerfil');
                    Alert.alert("SorBurgers", json.msj);
                    navigation.navigate('Login');
                }
            }
        }
        catch(err){

        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.Account}>
                <View style={styles.imgContainer}>
                    <Image source={logo} style={styles.image}/>
                </View>
            </View>

            {isLoading ? <ActivityIndicator /> :
            (
                <View style={styles.controlContainer}>
                    <View style={styles.form}>
                        <Text style={styles.labelForm}>Correo</Text>
                        <TextInput
                        
                        style={styles.comings}
                        defaultValue={correo}
                        onChangeText={(val) => setCorreo(val)}
                        autoCapitalize={'none'}
                        />

                        <Text style={styles.labelForm}>Contraseña</Text>
                        <TextInput
                        
                        style={styles.comings}
                        defaultValue={contrasenia}
                        placeholder="Contraseña"
                        placeholderTextColor={"#E4DBD9"}
                        autoCapitalize={'none'}
                        secureTextEntry={true}
                        passwordRules=''
                        onChangeText={(val) => setContrasenia(val)}
                        />

                        <Text style={styles.labelForm}>Confirmar Contraseña</Text>
                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Confirmar contraseña"
                        placeholderTextColor={"#E4DBD9"}
                        autoCapitalize={'none'}
                        secureTextEntry={true}
                        passwordRules=''
                        onChangeText={(val) => setConfirmar(val)}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Guardar" onPress={pressHandler}/>
                        </View>

                        <View style={styles.button}>
                            <Button title="Cancelar" onPress={() => navigation.goBack()}/>
                        </View>

                    </View>
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#111B1E",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    Account:{
        marginTop: 10,
        width: "100%",
        height: 180,
        alignItems: "center",
        justifyContent: "center"
    },
    imgContainer:{
        marginTop: 20,
        alignItems: "center",
        height: 350,
        width: "100%",
        justifyContent: "center",
        marginBottom: 10
    },
    image:{
        height: 200,
        width: 200,
        borderRadius: 10,
        resizeMode: "contain"
    },
    controlContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    form: {
        padding: 20
    },
    labelForm:{
        color: "#E4DBD9",
        marginStart: 20,
        marginBottom: 5,
        fontSize: 18
    },
    comings:{
        width: 300,
        padding: 15,
        marginBottom: 10,
        fontSize: 18,
        color: "#E4DBD9",
        backgroundColor: "#2F4C58",
        borderRadius: 10,
        marginStart: 15
    },
    buttonContainer:{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    button:{
        margin: 10
    }
})