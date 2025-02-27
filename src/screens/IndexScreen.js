import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Context } from '../context/BlogContext';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBlogPosts()
      .then(() => setLoading(false));

    const listener = navigation.addListener('didFocus', () => {
      setLoading(true);
      getBlogPosts()
        .then(() => setLoading(false));
    });

    return () => {
      if (listener) {
        listener.remove();
      }
    }
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('CreateBlog')} style={styles.Createbtn}>
          <FontAwesome6 name="plus" size={18} color="white" />
          <Text style={styles.CreatebtnText}>Create blog</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          data={state.reverse()}
          keyExtractor={(blogPost) => blogPost.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ShowBlog', { id: item.id })}>
              <View style={styles.blogCard}>

                {/* Title and Delete Button */}
                <View style={styles.blogHeader}>
                  <Text style={styles.BlogTitle}>{item.title}</Text>
                  <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                    <FontAwesome5 name="trash" size={20} color="black" />
                  </TouchableOpacity>
                </View>

                {/* Image */}
                {item.image && (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  blogCard: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 2, 
    shadowColor: '#f8f8f8', 
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  blogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  BlogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
  },
  Createbtn: {
    marginRight: 20,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  CreatebtnText: {
    fontSize: 16,
    color: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
