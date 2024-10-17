import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Notes = ({ navigation }) => {
    const [notes, setNotes] = useState([]);

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

    const notedtls = () => {
        console.log("press");
        navigation.navigate('noteDtls', { note: '' });
    };

    // Function to render each note item
    const renderNoteItem = ({ item }) => (
        <TouchableOpacity style={[styles.card, { backgroundColor: '#36465D' }]} onPress={() => navigation.navigate('noteDtls', { note: item })}>
            <View style={{ justifyContent: 'space-between' }}>
                <View>

                    <Text style={styles.noteTitle}>{item.title}</Text>
                    <Text style={styles.noteContent} numberOfLines={4}>{item.content}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                renderItem={renderNoteItem}
                keyExtractor={item => item.id}
                numColumns={2} // Set number of columns for grid layout
                columnWrapperStyle={styles.row} // Style for the rows
            />
            <TouchableOpacity onPress={notedtls} style={styles.touchable}>
                <Image source={require('../../assets/add.png')} style={styles.image} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Adjust to start from top
        // alignItems: 'center',
        backgroundColor: '#f9f9f9', // Light background for contrast
        padding: 10, // Padding around the container
    },

    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        borderRadius: 5,
        margin: 15,
        paddingRight: 15,
        width: 158,
        height: 156,
        color: '#fff',
    },

    touchable: {
        position: 'absolute', // Positioning the image absolutely within the parent view
        bottom: 30, // Distance from the bottom of the screen
        right: 20, // Distance from the right of the screen
        // backgroundColor: '#4CAF50', // Background color for visibility
        borderRadius: 30, // Rounded button
        elevation: 15, // Add shadow
    },
    image: {
        width: 60, // Width of the image
        height: 60, // Height of the image
        padding: 10,
    },
    noteItem: {
        flexDirection: 'column',
        justifyContent: 'space-between'
        // flex: 1, // Allow note items to fill the available space
        // margin: 5, // Space between items
        // padding: 16,
        // borderRadius: 8, // Rounded corners
        // borderWidth: 1, // Border for the note item
        // borderColor: '#ddd', // Light border color
        // backgroundColor: '#fff', // Background color for the note
        // shadowColor: '#000', // Shadow color
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.2, // Shadow opacity
        // shadowRadius: 1.41, // Shadow radius
        // elevation: 2, // Android shadow
    },
    noteTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        top: 10,
        left: 10,

    },
    noteContent: {
        color: '#FFFBFB',
        fontSize: 15,
        top: 18,
        left: 10
    },
});

export default Notes;
