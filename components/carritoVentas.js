import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';

export default function Carrito({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.carrito}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>SorBurgers Carrito</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttons}>
                        <Button title='Cancelar Orden' color='#cf0415'/>
                    </View>
                </View>
                
                <View style={styles.item}>
                    <View style={styles.imageRow}>
                        <View style={styles.image}>
                           
                        </View>
                        <View style={styles.quantity}>
                          <Text style={styles.title2}>1</Text>
                        </View>
                        <View style={styles.deleteIcon}></View>
                    </View>
                    <Text style={styles.itemText}>Aros de Cebolla</Text>
                    <Text style={styles.itemText}>Sabrosos Aros de de cebolla crujientes y empanizados.</Text>
                    <Text style={styles.itemText}>Lps. 53.00</Text>
                </View>

                <View style={styles.buttonContainer}>
                        <View style={styles.buttons}>
                            <Button title=' + Agregar Otro' color='#3d49b8' />
                        </View>
                </View>
                
            </View>
            <View style={styles.lowerContainer}>
                <Text style={styles.text}>SubTotal:           Lps. 53.00</Text>
                <Text style={styles.text}>Impuesto:        Lps. 7.95</Text>
                <Text style={styles.text}>Total:                 Lps. 60.95</Text>

                <View style={styles.buttonContainer}>
                        <View style={styles.buttons}>
                            <Button title='Procesar Orden' color='#00cf07'/>
                        </View>
                </View>

            </View>
            
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111B1E",
        alignItems: "center",
        justifyContent: "flex-start"
      },
      carrito: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        
      },
      titleContainer:{
        padding: 10,
        alignItems: "stretch",
        justifyContent: "center",
        borderBottomColor: "white",
        borderBottomWidth: StyleSheet.hairlineWidth
      },
      title:{
        color: "#E4DBD9",
        fontSize: 36,
        textAlign: "center"
      },
      title2:{
        color: "#000000",
        fontSize: 36,
        textAlign: "center"
      },
      buttonContainer:{
        flex: 1,
        alignItems: "center",
      },
      buttons:{
        padding: 5, 
      },
      itemContainer: {
        flex: 3,
        padding: 20,
        width: "100%",
        alignItems: "center",
        backgroundColor: "blue"
        
      },
      item: {
        width: 300,
        height: 200,
        backgroundColor: "#969696",
        borderRadius: 15,
      },
      itemText: {
          color: "white",
          textAlign: "center",
          /*backgroundColor: "blue",*/
          fontSize: 16,
      },
      image: {
          width: 70,
          height: 70,
          backgroundColor: "white",
          marginTop: 15,
          marginLeft: 15,
          borderRadius: 15,
      },
      imageRow: {
          height: 90,
          flexDirection: "row",
          /*backgroundColor: "red",*/
          borderRadius: 15,
      },
      text: {
          fontSize: 20,
          color: "#E4DBD9",
          textAlign: "center",
      },
      quantity: {
        width: 50,
        height: 50,
        backgroundColor: "white",
        marginTop: 10,
        borderRadius: 100,
        marginLeft: 90,
        marginTop: 20,
      },
      deleteIcon: {
        width: 50,
        height: 50,
        backgroundColor: "white",
        marginTop: 20,
        borderRadius: 100,
        marginLeft: 10
      },
      lowerContainer: {
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
          marginTop: 10,
          padding: 20,
          backgroundColor: "#3d49b8",
          borderRadius: 15
      }
})