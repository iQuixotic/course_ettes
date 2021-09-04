import React, { Component } from 'react'
import Posts from '../../components/Posts';
import PostForm from '../../components/PostForm';

class Home extends Component {
    render() {
        return (
            <div>
                <PostForm />
                <hr/>
                <Posts/>
                Hello
            </div>
        )
    }
}

export default Home;