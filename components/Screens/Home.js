import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import homeBg from "../../assets/homeBg.jpg";
import { deviceHeight, deviceWidth } from './Dimensions';

const Home = () => {
    const [data, setData] = useState([]);
    const [currentVal, setCurrentVal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://random-data-api.com/api/users/random_user?size=80");
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);

    const handlePrevious = () => {
        if (currentVal > 0) {
            setCurrentVal(currentVal - 1);
        }
    };

    const handleNext = () => {
        if (currentVal < data.length - 1) {
            setCurrentVal(currentVal + 1);
        }
    };

    const user = data[currentVal] || {}; 

    return (
        <ImageBackground
            source={homeBg}
            resizeMode="cover"
            style={{ height: deviceHeight }}
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{backgroundColor:"rgba(187, 143, 252, 0.66)", height: 350, width: deviceWidth - 20, borderRadius: 10, paddingTop: 15, marginTop: 50, alignItems: 'center', paddingLeft: 8,borderRadius:15 }}>
                   <View style={{borderWidth:1,borderRadius: 50,borderColor:"white"}}>

                 
                    <Image
                        style={{ borderRadius: 50, height: 100, width: 100 }}
                        source={{ uri: user.avatar }}
                        defaultSource={require("../../assets/User2.jpeg")}
                    />
                      </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                        <Text style={[styles.text, styles.bold, styles.title]}>{user.first_name}</Text>
                        <Text style={[styles.text, styles.bold, styles.title]}>{user.last_name}</Text>
                    </View>
                    <View style={{ marginLeft: 25, alignSelf: 'flex-start', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.text, styles.bold]}>Id: </Text>
                            <Text style={styles.text}>{user.id}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                            <Text style={[styles.text, styles.bold]}>Username: </Text>
                            <Text style={styles.text}>{user.username}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.text, styles.bold]}>Password: </Text>
                            <Text style={styles.text}>{user.password}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                            <Text style={[styles.text, styles.bold]}>Uid: </Text>
                            <Text style={styles.text}>{user.uid}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.text, styles.bold]}>Email: </Text>
                            <Text style={styles.text}>{user.email}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: deviceWidth - 40, marginTop: 50 }}>
                    <TouchableOpacity onPress={handlePrevious}>
                        <View style={styles.button}>
                            <Text style={{ color: "black" }}>Previous</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext}>
                        <View style={styles.button}>
                            <Text style={{ color: "black" }}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: 'black',
    },
    bold: {
        fontWeight: "bold",
    },
    title: {
        fontSize: 24,
    },
    button: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default Home;
