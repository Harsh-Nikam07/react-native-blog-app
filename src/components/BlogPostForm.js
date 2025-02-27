import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

const BlogPostForm = ({ navigation, onSubmit, initialValues = { title: '', content: '', image: null } }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);
    const [image, setImage] = useState(initialValues.image);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, we need camera permissions...');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>
                Enter Title: 
            </Text>
            <TextInput 
                multiline
                numberOfLines={2}
                value={title} 
                onChangeText={(text) => setTitle(text)} 
                style={styles.titleInput} 
            />

            <Text style={styles.label}>
                Enter Content: 
            </Text>

            <TextInput
                multiline
                numberOfLines={3}
                value={content} 
                onChangeText={(text) => setContent(text)} 
                style={styles.contentInput} 
            />

            <TouchableOpacity 
                style={styles.imageButton} 
                onPress={pickImage}
            >
                <Text style={styles.imageButtonText}>
                    {image ? 'Change Image' : 'Add Image'}
                </Text>
            </TouchableOpacity>

            {image && (
                <Image
                    source={{ uri: image }}
                    style={styles.imagePreview} 
                />
            )}

            {image && (
                <TouchableOpacity onPress={() => setImage('')} style={styles.removeImageBtn}>
                    <Text style={styles.removeImageButtonText}>Remove Image</Text>
                </TouchableOpacity>
            )}

            <Button 
                title='Save Blog Post'
                onPress={() => onSubmit(title, content, image)}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        height: '100%',
        flex: 1,
        paddingBottom: 70,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    titleInput: {
        height: 40,
        borderColor: '#E9E9E9',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        height: 60, 
        textAlignVertical: 'top', 
    },
    contentInput: {
        height: 40,
        borderColor: '#E9E9E9',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        height: 140, 
        textAlignVertical: 'top', 
    },
    imageButton: {
        backgroundColor: '#E9E9E9',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    imageButtonText: {
        color: 'black',
        fontWeight: '500',
    },
    imagePreview: {
        position: 'relative',
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 5,
        resizeMode: 'cover',
    },
    removeImageBtn: {
        position: 'absolute',
        bottom: 70,
        right: 10,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        zIndex: 1,
    },
    removeImageButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default BlogPostForm;
