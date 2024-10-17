import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NotesDetails = ({ route }) => {

    const { note } = route.params; // Destructure the note from route params

    console.log(note.title)
    const navigation = useNavigation();
    const [title, setTitle] = useState(note.title ? note.title : '');
    const [content, setContent] = useState(note.content ? note.content : '');

    useEffect(() => {
        const beforeRemoveListener = navigation.addListener('beforeRemove', (e) => {
            // Prevent the default back action
            e.preventDefault();

            // Show a confirmation dialog to the user
            Alert.alert("Hold on!", "Do you want to save this note before leaving?", [

                {
                    text: "YES",
                    onPress: async () => {
                        if (title && content)
                            await addNote(title, content, note.id); // Call addNote and wait for it to complete
                        navigation.dispatch(e.data.action); // Now navigate back
                    }
                },
                {
                    text: "NO",
                    onPress: () => {
                        navigation.dispatch(e.data.action); // Navigate back without saving
                    }
                }
            ]);
        });

        // Clean up the listener when the component unmounts
        return () => beforeRemoveListener();
    }, [navigation, title, content, note]);

    const addNote = async (title, content, id = null) => {
        console.log("Adding/Updating Note - Title:", title, "Content:", content);

        const newNote = { id: id || Date.now().toString(), title, content }; // Use existing id if provided, otherwise generate a new one
        const existingNotes = await AsyncStorage.getItem('notes');
        const notesArray = existingNotes ? JSON.parse(existingNotes) : [];

        // Check if the note already exists by matching the id
        const noteIndex = notesArray.findIndex(note => note.id === newNote.id);

        if (noteIndex > -1) {
            // If the note exists, update it
            notesArray[noteIndex] = newNote;
            console.log("Note updated:", newNote);
        } else {
            // If the note doesn't exist, add it to the array
            notesArray.push(newNote);
            console.log("Note added:", newNote);
        }

        // Save the updated notes array back to AsyncStorage
        console.log("Updated Notes Array:", notesArray);
        await AsyncStorage.setItem('notes', JSON.stringify(notesArray));

        // Clear input fields if needed
        setTitle('');
        setContent('');
    };


    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Title"
                style={{ fontSize: 30, fontWeight: "bold", color: '#000' }}
                multiline={true}
                autoFocus={true}
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="Content"
                style={{ fontSize: 20, color: '#000' }}
                multiline={true}
                value={content}
                onChangeText={setContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
});

export default NotesDetails;
