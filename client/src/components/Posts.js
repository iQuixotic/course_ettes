import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchPosts} from '../redux/actions/postActions'

class Posts extends Component {

    componentDidMount(){
        this.props.fetchPosts();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.newPost){
            this.props.posts.unshift(nextProps.newPost);
        }
    }

    render() {
        const postItems = this.props.posts.map(el => (
            <div key={el.id}>
              <h3>{el.title}</h3>
              <p>{el.body}</p>
            </div>
          ));
        return (
            <div>
                <h1>Posts</h1>
                {postItems}
            </div>
        )
    }
}

postMessage.PropTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
})

export default connect(mapStateToProps, {fetchPosts})(Posts);