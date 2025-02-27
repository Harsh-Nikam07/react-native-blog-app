import React, { useContext } from 'react';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const CreateBlogScreen = ({ navigation }) => {

    const { addBlogPost } = useContext(Context)

    return (
        <>
            <BlogPostForm 
                onSubmit = { (title, content, image) => {
                    addBlogPost(title, content,image, () => navigation.navigate('Index'))
                } }
            />
        </>
    );
}

export default CreateBlogScreen;
