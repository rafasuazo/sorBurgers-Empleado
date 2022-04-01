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
                const respuesta = await fetch(ip.ip + "clientes/modificar?id=" + id,
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
                        
                        // llamando la función para cambiar la imagen
                        changeImage();
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

    // para poder seleccionar desde el teléfono
    let openImagePicker = async () => {

        let  perimissionsResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(perimissionsResult.granted === false){
            Alert.alert("SorBurgers", "Necesitamos tu permiso para acceder a la cámara");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        });
        console.log(pickerResult);

        if(pickerResult.cancelled === true){
            return;
        }

        setSelectedImage({localUri: pickerResult.uri}); // este es para mostrarlo en un div
        setFilename(pickerResult.uri); // este es el que se va a mandar a Nodejs
    }

    // poder cambiar la imagen de perfil
    const changeImage = async () => {

        // seteando la forma de enviar el archivo
        const formData = new FormData();
        formData.append("img", {
            name: new Date() + "_img",
            uri: filename,
            type: 'image/jpg'
        });

        try{

            const respuesta = await fetch(ip.ip + "archivos/?id=" + id, 
            {
                method: 'POST',
                headers:{
                    Accept: "application/json",
                    'Content-Type': "multipart/form-data"
                },
                body: formData
            });

            const json = await respuesta.json();
            let cliente = JSON.parse(await AsyncStorage.getItem('cliente'));
            await AsyncStorage.setItem('cliente', JSON.stringify(cliente), 
            () => {
                AsyncStorage.mergeItem('cliente', JSON.stringify(json.id))
            })
        }
        catch(err){
            console.log(err);
        }
    }

    const uri = 'http://192.168.0.9:3003/usuario/img/' + filename;
    return(
        <View style={styles.container}>
            <View style={styles.presentationContainer}>
                <View style={styles.presentation}>
                    <View style={styles.imageContainer}>

                        {selectedImage ? (
                            <Image source={{uri: selectedImage.localUri}} style={styles.image}/>
                        ) : (
                            <Image source={{uri: uri}} style={styles.image}/>
                        )}
                        <TouchableOpacity onPress={openImagePicker}>
                            <Text style={styles.textoImagen}>Cambiar imagen</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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
    imageContainer: {
        height: 180,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: "5%"
    },
    image:{
        height: 120,
        width: 120,
        borderRadius: 100,
        backgroundColor: "#E4DBD9"
    },
    textoImagen:{
        color: "#E4DBD9",
        fontSize: 15,
        fontWeight: "600",
        paddingTop: 10
    },
    textoCliente:{
        color: "#6E93D6",
        fontSize: 20,
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
