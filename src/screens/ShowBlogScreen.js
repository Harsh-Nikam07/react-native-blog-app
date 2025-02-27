import React, { useContext , useLayoutEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Context } from '../context/BlogContext';
import { ScrollView } from 'react-native-gesture-handler';

const ShowBlogScreen = ( { navigation, route } ) => {

    const { state } = useContext(Context)
    
    const blogID = route.params?.id

    const blogPost = state.find( (blogPost) => {
        return blogPost.id === blogID
    } )

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('EditBlog', { id : blogID })} style={styles.Editbtn} >
                <Text style={styles.EditbtnText}>Edit</Text>
              <MaterialCommunityIcons name="pencil" size={18} color="white" />
            </TouchableOpacity>
          ),
        });
      }, [navigation]);


    return (
        <ScrollView style={styles.container}>


            {blogPost.image && (
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: blogPost.image }} 
                        style={styles.image}
                    />
                </View>
            )}

            <Text style={styles.title}>
                {blogPost.title}
            </Text>


            <Text style={styles.content}>
                {blogPost.content}
            </Text>



            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        height: '100%',
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: 250,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        color: 'black',
    },
    Editbtn:{
        marginRight: 20,
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    EditbtnText: {
        fontSize: 16,
        color: 'white'
    }
})

export default ShowBlogScreen;
