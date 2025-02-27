import React, { useContext } from 'react';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditBlogScreen = ( {navigation, route} ) => {
    const {state, editBlogPost} = useContext(Context);
    const blogID = route.params?.id;
    const blogPost = state.find( (blogPost) => blogPost.id === blogID );

    return (
        <>
            <BlogPostForm
                initialValues={
                    { 
                        title: blogPost.title, 
                        content: blogPost.content,
                        image: blogPost.image
                    }
                }
                onSubmit={(title, content, image) => {
                    editBlogPost( 
                        blogID, title, content, image, () => navigation.navigate('Index')  
                    )
                }}
            />
        </>
    );
}

export default EditBlogScreen;
