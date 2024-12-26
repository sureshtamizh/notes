import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react"
import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"

const NoteDetails = ({ navigation, route }) => {

    const { note } = route.params;
    const inputRef = useRef(null)
    const [title, setTitle] = useState(note.title ? note.title : '');
    const [content, setContent] = useState(note.content ? note.content : '');

    useEffect(() => {
        if (!title && !content) {
            inputRef.current?.focus();
            console.log("render")
        }

        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            Keyboard.dismiss(); // Dismiss the keyboard before navigating

            if (title || content) {
                // Prevent default navigation
                e.preventDefault();

                // Save the note before navigating away
                addNote(title, content, note.id).then(() => {
                    console.log("Note saved before navigating away");
                    navigation.dispatch(e.data.action); // Proceed with navigation
                });
            } else {
                // Allow navigation if no title or content
                navigation.dispatch(e.data.action);
            }
        });

        return unsubscribe; // Cleanup the listener when the component unmounts
    }, [navigation, title, content]);



    const addNote = async (title, content, id = null) => {
        console.log("Adding/Updating Note - Title:", title, "Content:", content);
        // { "content": "test", "id": "1735223034579", "title": "title" }

        const newNote = { id: id || Date.now().toString(), title, content }; // Use existing id if provided, otherwise generate a new one
        const existingNotes = await AsyncStorage.getItem('notes');
        const notesArray = existingNotes ? JSON.parse(existingNotes) : [];

        // Check if the note already exists by matching the id
        const noteIndex = notesArray.findIndex(note => note.id === newNote.id);

        console.log("noteIndex", notesArray, id)
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
        <SafeAreaView style={styles.container}>
            <TextInput placeholder="Title" placeholderTextColor={'black'} style={styles.title} value={title}
                onChangeText={setTitle} />
            <TextInput placeholder="Note" ref={inputRef} multiline={true}
                placeholderTextColor={'black'}
                cursorColor={'black'}
                style={styles.notes} value={content}
                onChangeText={setContent} />
        </SafeAreaView>
    )
}

export default NoteDetails

const styles = StyleSheet.create({
    container: { flex: 1, margin: 10 },
    notes: { color: "black", width: '90%', fontSize: 17, placeholderTextColor: 'black' },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500'
    }
})
