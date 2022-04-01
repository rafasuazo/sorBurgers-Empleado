import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert} from "react-native";
const ip = require('../../ip/ip');


export default function ModificarReceta({route, navigation}){
    
    const {id}= route.params; 
    // hooks
    const [descripcion, setDescripcion] = useState('');
    const [ejecucion, setEjecucion] = useState(null);
    if(ejecucion==null){
        try {
            const response = fetch(ip.ip + "recetas/editar?id=" + id, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((json) => {
                    setDescripcion(json.descripcion);
                    console.log(json);   
                });  
            setEjecucion(false);
        } 
        catch (error) {
            setEjecucion(false);
            console.error(error);
        }
        setEjecucion(false);  
    }

    const pressHandler = async () => {
        
        if(descripcion.length <=0 ){
            Alert.alert("SorBurgers","Todos campos requeridos");
        }
        else{
            try {
                const respuesta = await fetch(ip.ip + "recetas/modificar?id=" + id, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        descripcion: descripcion
                    })
                });
                const json = await respuesta.json();
                console.log(json);
                Alert.alert("SorBurgers", "Receta Modificado Correctamente");
                navigation.navigate('RecetasMenu');
            } catch (error) {
                console.error(error);
            }
        }
    }
    const pressCancel = async () => {
        navigation.navigate('RecetasMenu');
    }

     return(
        <View style={styles.container}>
            <View style={styles.signup}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Modificar una Receta</Text>
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.controls}>
                        
                        <TextInput
                         
                        style={styles.comings}
                        placeholder="Descripcion de la Receta"
                        placeholderTextColor={"#E4DBD9"}
                        multiline={true}
                        defaultValue={descripcion}
                        onChangeText={(val) => setDescripcion(val)}
                        />
                    </View>    
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Modificar" onPress={pressHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Cancelar" onPress={pressCancel} />
                        </View>
                    </View>
                   
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#111B1E",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    pickers:{
        alignContent:"center"
    },
    signup:{
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "2%"
    },
    titleContainer:{
        padding: 15,
        alignItems: "stretch",
        justifyContent: "center",
        height:70
    },
    title:{
        color: "#E4DBD9",
        fontSize: 28,
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
    buttonContainer:{
        padding: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "10%",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    button:{
        margin: 10
    },
    terms:{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 15,
        paddingBottom: 20,
        width: "100%"
    },
    label:{
        color: "#E4DBD9",
        padding: 20,
        alignItems: "stretch",
        textAlign: "left",
        fontSize: 20
    }
})