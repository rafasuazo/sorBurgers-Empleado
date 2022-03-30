import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, TextInput, Button, Image, Alert } from "react-native";
import logo from "../assets/icon.png"

export default function MiCuenta(){

    // hooks
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [editable, setEditable] = useState(false);

    // extraer datos de la api
    const getUsuario = async () => {

        try{
            const response = await fetch('http://192.168.0.9:3003/api/usuarios/editar?id=1')
            const json = await response.json();
            setCorreo(json.Usuario.correo);
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

            const respuesta = await fetch('http://192.168.0.183:3003/api/usuarios/modificar/cliente?id=1',
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

                    //navigation.navigate('MenuPerfil');
                    Alert.alert("SorBurgers", json.msj);
                    setEditable(false);
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

            <View style={styles.controlContainer}>
                <View style={styles.form}>
                    <Text style={styles.labelForm}>Correo</Text>
                    <TextInput
                    
                    style={styles.comings}
                    defaultValue={correo}
                    editable={editable}
                    onChangeText={(val) => setCorreo(val)}
                    autoCapitalize={'none'}
                    />

                    <Text style={styles.labelForm}>Contraseña</Text>
                    <TextInput
                    
                    style={styles.comings}
                    defaultValue={contrasenia}
                    editable={editable}
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
                    editable={editable}
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
                        <Button title="Editar" onPress={() => setEditable(true)}/>
                    </View>

                    <View style={styles.button}>
                        <Button title="Guardar" onPress={pressHandler}/>
                    </View>
                </View>
            </View>
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
        width: "100%",
        height: 180,
        alignItems: "center",
        justifyContent: "center"
    },
    imgContainer:{
        alignItems: "center",
        height: 350,
        width: "100%",
        justifyContent: "center"
    },
    image:{
        height: 100,
        width: 100,
        borderRadius: 10
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