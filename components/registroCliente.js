import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
const ip = require('../ip/ip');

export default function RegistroCliente({navigation}){

    // hooks
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [fecha, setFecha] = useState(new Date());

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

    const terms = "Al usar SorBurgers-app acepta nuestros términos y condiciones."; 

    const pressHandler = async () => {

        if(nombre.length <= 0 || apellido.length <=0 || telefono.length <= 0 || fechaNacimiento.length <= 0){
            Alert.alert("SorBurgers", "Todos los campos son requeridos");
        }
        else{

            try{

                const respuesta = await fetch(ip.ip + "empleados/guardar",
                    {
                        method: 'POST',
                        headers:{
                            Accept: "application/json",
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            puestoId: 1,
                            nombre: nombre,
                            apellido: apellido,
                            telefono: telefono,
                            fechaNacimiento: fechaNacimiento
                        })
                    }
                );

                const json = await respuesta.json();
                console.log(json);

                // si vienen errores, que pos los imprima
                if(json.errors){

                    json.errors.forEach((error) => {
                        Alert.alert("SorBurgers", error.msg)
                    });
                }
                else{

                    if(json.msj == "Registro duplicado!"){
                        Alert.alert("SorBurgers", json.msj);   
                    }
                    else{
                        
                        // sino pues que pase recio a la siguiente pantalla
                        navigation.navigate('Usuario');
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
            <View style={styles.signup}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Sign Up</Text>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.controls}>
                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Nombre"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setNombre(val)}
                        />

                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Apellido"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setApellido(val)}
                        />

                        <TextInput
                        
                        style={styles.comings}
                        placeholder="Teléfono"
                        placeholderTextColor={"#E4DBD9"}
                        onChangeText={(val) => setTelefono(val)}
                        keyboardType={"phone-pad"}
                        />
                        
                        <Text style={styles.date}>Fecha de Nacimiento: {fechaNacimiento}</Text>
                        <Button title="Mostrar Calendario" onPress={showDatePicker}/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Siguiente" onPress={pressHandler} />
                        </View>
                    </View>
                </View>

                <View style={styles.terms}>
                    <Text style={{color: "#E4D8D9", textAlign: "center"}}>{terms}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#111B1E",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    signup:{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "15%"
    },
    titleContainer:{
        padding: 25,
        alignItems: "stretch",
        justifyContent: "center"
    },
    title:{
        color: "#E4DBD9",
        fontSize: 36,
        textAlign: "center"
    },
    inputsContainer:{
        marginTop: "5%",
        padding: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    controls:{
        padding: 15,
        paddingHorizontal: "10%"
    },
    comings:{
        width: 300,
        padding: 15,
        marginBottom: "10%",
        fontSize: 18,
        color: "#E4DBD9",
        backgroundColor: "#2F4C58",
        borderRadius: 10
    },
    date:{
        color: "#fff",
        marginTop: "10%",
        fontSize: 18
    },
    buttonContainer:{
        padding: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "5%"
    },
    button:{
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