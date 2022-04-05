import React, {useState, useEffect} from "react";
import { ActivityIndicator, StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ip = require("../ip/ip");

export default function Inicio({navigation}){    

    // hooks
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [isLoading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filename, setFilename] = useState('');

    const onChange = (event, value) => {
        const currentDate = value;
        setFecha(currentDate);

        let tmpDate = new Date(currentDate);
        let fDate = tmpDate.getFullYear() + '-' + String((tmpDate.getMonth() + 1)).padStart(2, '0') + '-' + String(tmpDate.getDate()).padStart(2, '0');
        setFechaNacimiento(fDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: fecha,
            onChange,
            mode: currentMode
        })
    };

    const showDatePicker = () => {
        showMode('date');
    };

    // sacar los datos del empleado en el asyncStorage
    const getEmpleado = async () => {

        let empleado = JSON.parse(await AsyncStorage.getItem('empleado'));

        if(!empleado){
            console.log("Usuario no autenticado");
            setId(null)
        }
        else{

            try{
                
                console.log(empleado);
                setId(empleado.id);
                setNombre(empleado.nombre);
                setApellido(empleado.apellido);
                setTelefono(empleado.telefono);
                setFechaNacimiento(empleado.fechaNacimiento);
                setFilename(empleado.imagen);
            }
            catch(err){
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        }
    }

    // este será para cargar la información del cliente
    useEffect(() => {
        getEmpleado();
    }, []);

    // pressHandler para hacer la modificación
    const pressHandler = async () => {

        if(nombre.length <= 0 || apellido.length <=0 || telefono.length <= 0 || fechaNacimiento.length <= 0){
            Alert.alert("SorBurgers", "Todos los campos son requeridos");
        }
        else{

            try{
                const respuesta = await fetch(ip.ip + "empleados/modificar?id=" + id,
                    {
                        method: 'PUT',
                        headers:{
                            Accept: "application/json",
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            nombre: nombre,
                            apellido: apellido,
                            telefono: telefono,
                            fechaNacimiento: fechaNacimiento
                        }),
                    }
                );

                const json = await respuesta.json();
                console.log(json);

                if(json.errors){
                    json.errors.forEach(error => {
                        Alert.alert("SorBurgers", error.msg);
                    });
                }
                else{

                    if(json.msj == "Registro duplicado!"){
                        Alert.alert("SorBurgers", json.msj);
                    }
                    else{

                        const data = {
                            nombre: nombre,
                            apellido: apellido,
                            telefono: telefono,
                            fechaNacimiento: fechaNacimiento
                        }

                        let empleado = JSON.parse(await AsyncStorage.getItem('empleado'));
                        await AsyncStorage.setItem('empleado', JSON.stringify(empleado), 
                        () => {
                            AsyncStorage.mergeItem('empleado', JSON.stringify(data))
                        })
                        
                        Alert.alert("SorBurgers", json.msj);
                        navigation.navigate('MenuPerfil');
                    }
                }
            }
            catch(err){
                console.log(err);
            }
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.presentationContainer}>
                <View style={styles.presentation}>
                    <Text style={styles.textoCliente}>Hola{"\n"}{nombre}{"\t"} {apellido}</Text>
                </View>
            </View>

            {isLoading ? <ActivityIndicator /> : (
                <View style={styles.formContainer}>
                    <View style={styles.form}>
                        <Text style={styles.labelForm}>Nombre</Text>
                        <TextInput 
                        
                        style={styles.comings}
                        defaultValue={nombre}
                        onChangeText={(val) => setNombre(val)}
                        />

                        <Text style={styles.labelForm}>Apellido</Text>
                        <TextInput 
                        
                        style={styles.comings}
                        defaultValue={apellido}
                        onChangeText={(val) => setApellido(val)}
                        />

                        <Text style={styles.labelForm}>Número de teléfono</Text>
                        <TextInput 
                        
                        style={styles.comings}
                        defaultValue={telefono}
                        onChangeText={(val) => setTelefono(val)}
                        keyboardType={"phone-pad"}
                        />

                        <Text style={styles.labelForm}>Fecha de nacimiento: {"\t"}{fechaNacimiento} </Text>
                        <Button title="Mostrar Calendario" onPress={showDatePicker}/>
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
        flex: 1,
        backgroundColor: "#111B1E",
        alignItems: "center",
        justifyContent: "center"
    },
    presentationContainer: {
        marginTop: 15,
        width: "100%",
        height: 180,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    textoCliente:{
        color: "#6E93D6",
        fontSize: 25,
        fontWeight: "700",
    },
    formContainer:{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    form:{
        margin: 20
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
        marginBottom: 15,
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
        margin: 10,
    },
    thumbnail: {
        width: 400,
        height: 400,
        resizeMode: "contain",
        borderRadius: 50,
        marginBottom: 15
    }
})
