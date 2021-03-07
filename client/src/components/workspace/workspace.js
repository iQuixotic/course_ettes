import React from 'react';
import './workspace.sass';



import  { Component } from 'react'

class Workspace extends Component {
    render() {
        return (
            <div className='workspace-body'>
                <div onClick={this.props.onClick} className="flip-card">
                    <div className={this.props.front ? "flip-card-inner animate-cfb" : "flip-card-innery animate-cff"}> 
                        <div  className={this.props.front5 ? "card flip-card-front" : "card flip-card-back"}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Workspace;