import React from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert} from "react-native";

export default function Empleados({navigation}){

    return(
        <View style={styles.container}>
            <View style={styles.contendorempleados}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Información Empleados</Text>
                    <Text style={styles.subtitle}>De click a la opcion que desea realizar</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttons}>
                        <Button title="Listar Empleados" onPress={() => navigation.navigate('EmpleadosListar')}/>
                    </View>
                    <View style={styles.buttons}>
                        <Button title="Regresar" onPress={() => navigation.navigate('MenuPrincipal')}/>
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
    contendorempleados: {
        backgroundColor: '#111B1E',
        justifyContent: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "15%"
    },
    buttonContainer:{
        padding: 95,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "10%",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    buttons:{
        margin: 10
    },
    titleContainer:{
        marginTop: 1,
        padding: 25,
        alignItems: "stretch",
        justifyContent: "center",
        height:150
    },
    title:{
        color: "#E4DBD9",
        fontSize: 36,
        textAlign: "center"
    },
    subtitle:{
        color: "#E4DBD9",
        fontSize: 18,
        textAlign: "center"
    }
})