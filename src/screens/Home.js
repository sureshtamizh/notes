
import React, { useState } from "react"
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Animated, Button, SafeAreaView, TouchableWithoutFeedback, TextInput, Pressable } from "react-native"
import FootComponent from "../components/footerComponent";
import FloatButtton from "../components/floatButtton";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {

    const [notes, setNotes] = useState([]);

    const [imageSet, setImageSet] = useState(true)
    const [changeViews, setchangseView] = useState(true)


    useFocusEffect(
        React.useCallback(() => {
            const loadNotes = async () => {
                const savedNotes = await AsyncStorage.getItem('notes');
                console.log(savedNotes);
                if (savedNotes) {
                    setNotes(JSON.parse(savedNotes));
                }
            };

            loadNotes();

            // Return a cleanup function if needed
            return () => {
                // Any cleanup code if necessary
            };
        }, [])
    );

    //npx create-react-app appname
    const renderItem = ({ item }) => (
        <Pressable style={styles.item} onPress={() => Navigate(item)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.content}</Text>
        </Pressable>
    )
    console.log("res")

    const Navigate = (item) => {
        console.log("res", item)
        navigation.navigate("NoteDetails", { note: item })
    }

    const changeView = () => {
        setchangseView(!changeViews)
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.searchContainer}>
                <View style={styles.searchInputWrapper}>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#A3A3A3"
                        style={styles.searchInput}
                    />
                </View>
                <TouchableWithoutFeedback onPress={changeView}>
                    <Image
                        source={changeViews ? require('../../assets/download_1.png') : require('../../assets/download_2.png')}
                        style={styles.icon}
                    />
                </TouchableWithoutFeedback>
            </View>


            <FlatList
                data={notes}
                numColumns={changeViews ? 2 : 1} // Dynamically change the number of columns
                keyExtractor={(item) => item.id}
                columnWrapperStyle={changeViews ? { justifyContent: 'space-between' } : null}
                renderItem={renderItem}
                ListFooterComponent={<FootComponent />}
                key={changeViews ? 'twoColumns' : 'oneColumn'} // Change the key to force a re-render when changing numColumns
            />

            <FloatButtton navigations={Navigate} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    columnWrapper: {
        justifyContent: 'space-between'
    },
    item: {
        flex: 1,
        maxHeight: 150,
        height: 100,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        overflow: 'hidden'
    },
    title: {
        color: '#000',
        margin: 5,
        fontSize: 18,
        fontWeight: "500"
    },
    text: {
        color: '#000',
        margin: 5,
        fontSize: 15
    },
    icon: {
        width: 25,
        height: 25,
        right: 10
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 0.5,
        borderRadius: 15,
        margin: 10
    },
    searchInputWrapper: {
        height: 45,
        justifyContent: 'center',
        width: '90%'
    },
    searchInput: {
        height: '100%',
        fontSize: 16,
        color: '#000',
        paddingHorizontal: 10
    },
})
export default Home