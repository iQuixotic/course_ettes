import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createPost } from '../redux/actions/postActions'

class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            postBody: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: [e.target.value]
        })
        console.log(this.state)
    }
    onSubmit(e){
        e.preventDefault();

        const post = {
            title: this.state.title,
            body: this.state.postBody,
        }
        this.props.createPost(post);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Title: </label>
                        <input type="text" 
                            name ="title" 
                            onChange={this.onChange}
                            value={this.state.title}/>
                        <hr/>
                        <label>Body: </label>
                        <input 
                            type="text" 
                            name ="postBody"
                            onChange={this.onChange}
                            value={this.state.postBody}/>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

PostForm.propTypes = {
     createPost: PropTypes.func.isRequired
}

export default connect(null, { createPost })(PostForm);