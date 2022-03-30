import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Carrito({navigation}) {
    const [product, setProduct] = useState();
    const [total, setTotal] = useState(null);

    //Obtener datos del AsyncStorage
    const getProductos = async () => { 

    };

    //Calcular Subtotal, Impuesto, y Total
    const getCalculos = productData => {
        let total = 0;
        for (let index = 0; index < productData.length; index++) {
        let productPrice = productData[index].productPrice;
        total = total + productPrice;
        }
        setTotal(total);
    };

    //Funcion para eliminar item del carrito y del AsyncStorage
    const quitarProducto = async () => { 

    };

    //Procesar Orden
    const procesarOrden = async () => {
        try {
        //Pasar los datos de factura y detalle aqui antes de borrar el carrito de

        await AsyncStorage.removeItem('cartItems');
        } catch (error) {
        return error;
        }

        ToastAndroid.show('Su orden esta siendo procesada!', ToastAndroid.SHORT);
        navigation.navigate('Home');
    };

    return(
        <SafeAreaView style={{backgroundColor: '#111B1E'}}>
            
            <View style={styles.titulo}>
                <Icon style={{color: 'white'}} name="arrow-back-ios" size={28} onPress={navigation.goBack} />

                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Atras</Text>
            </View>
            
            <View style={styles.flat}>
                <FlatList 
                    data={product}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => {
                        return(
                            <><View style={styles.item}>
                                <View style={styles.imagen}>
                                    <Image style={{ flex: 1, resizeMode: "cover", width: 100, height: 90, borderRadius: 10 }} source={require("../../assets/ham.jpg")} />
                                </View>
                                <Text style={{color:"white", textAlign:'center',}}>Nombre: {item.nombre}</Text>
                                <Text style={{color:"white", textAlign:'center',}}>Precio: {item.precio}</Text>
                                <Text style={{color:"white", textAlign:'center',}}>Cantidad:  </Text>
                                <View style={style.botones}>
                                    <Icon name="remove" size={25} color={'white'} />
                                    <Icon name="add" size={25} color={'white'} />
                                </View>
                            </View>
                            <View style={styles.detalle}>
                                <Text style={{ color: "black", textAlign: 'center', }}>SubTotal: Lps.</Text>
                                <Text style={{ color: "black", textAlign: 'center', }}>Impuesto: Lps.</Text>
                                <Text style={{ color: "black", textAlign: 'center', }}>Total: Lps.</Text>
                                <View style={styles.buttonContainer}>
                                    <View style={styles.button}>
                                        <Button title="PROCESAR ORDEN" onPress={() => navigation.navigate("Home")} />
                                    </View>
                                </View>
                            </View></>
                        )
                    }}    

                />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "#111B1E",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    titulo: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    contenedorbuscador: {
        margin: 10,
        padding: 5,
        flexDirection: 'column',
    },
    contenedorinfo: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 20,
        padding: 5,
    },
    buttonContainer:{
        padding: 5,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "10%",
        flexDirection: "row",
        flexWrap: "wrap",
        flex:1
    },
    imagen:{
        backgroundColor: "black",
        width: 80,
        height:70,
        borderRadius:10,
        marginBottom:10,
        alignItems:"center"
    },
    button:{
        margin: 5
    },
    item:{
        marginTop: 15,
        fontSize: 15,
        marginHorizontal: 1,
        marginVertical:0.1,
        padding:20,
        borderRadius:15,
        backgroundColor:'#8d00c9',
        width: "48%",
        height:"85%",
        flexDirection: "column",
        alignItems: "center",
    },
    detalle: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 60,
        backgroundColor: "#8d00c9",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    botones: {
        width: 80,
        height: 30,
        backgroundColor: 'blue',
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
})