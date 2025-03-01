import React from "react";
import createDataContext from "./createDataContext";
import jsonserver from "../api/jsonserver";

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload;

        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        case 'edit_blogpost':
            return state.map(blogPost =>
                blogPost.id === action.payload.id ? action.payload : blogPost
            );
        default:
            return state;
    }
};

const getBlogPosts = dispatch => {
    return async () => {
       const response =  await jsonserver.get('/blogposts');

       dispatch( { type : 'get_blogposts', payload : response.data})
    }
}

const addBlogPost = dispatch => {
    return async (title, content, image,  callback) => {
        await jsonserver.post('/blogposts', {title, content, image, callback})
        // dispatch({ type: 'add_blogpost', payload: { title, content, image } });
        if (callback) callback();
    };
};

const deleteBlogPost = dispatch => {
    return async id => {

        await jsonserver.delete(`/blogposts/${id}`)
        dispatch({ type: 'delete_blogpost', payload: id });
    };
};

const editBlogPost = dispatch => {
    return async (id, title, content,image, callback) => {
        await jsonserver.put(`/blogposts/${id}`, { title, content, image})
        // dispatch({ type: 'edit_blogpost', payload: { id, title, content, image } });
        if (callback) callback();
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts }, 
    []
);