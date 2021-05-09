import React, { Component } from 'react'
import './pages.sass';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getColors } from '../../redux/actions/colorActions'
import { getCourseCards } from '../../redux/actions/cardsActions'

class Test extends Component {

    componentDidMount() {
        this.props.getColors();
        this.props.getCourseCards();
    }

    render() {
        const postCards = this.props.courseCards.map(el => (
            <div key={el._id}>
                <h3>{el.role}</h3>
            </div>
        ));
        const postItems = this.props.colors.map(el => (
            <div key={el._id}>
              <h3>{el.color}</h3>
            </div>
          ));
        return (
            <div>
                <h1>Colors</h1>
                {postCards}
                {postItems}
            </div>
        )
    }
}

postMessage.PropTypes = {
    courseCards: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    courseCards: state.courseCards.choices,
    colors: state.colors.choices
})

export default connect(mapStateToProps, {getColors, getCourseCards})(Test);
