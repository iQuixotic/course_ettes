import React, { Component } from 'react'
import { Workspace } from '../../components';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { cardState } from '../redux/actions/' 
import { getColors } from '../../redux/actions/colorActions'
import { getCourseCards } from '../../redux/actions/cardActions'
import { cardFlip } from '../../redux/actions/cardStateActions'

class Workstation extends Component {
    state = {
        // flip: true,
        // isFlipped: true,
        // frontOfCard: "Redux",
        // backOfCard: "PG words for the internet commit..."
    }
    componentDidMount() {
        this.props.getColors();
        this.props.getCourseCards();
    }

    flip = () => {
            let flip = !this.state.isFlipped;
            this.setState({ isFlipped: flip });
        setTimeout(() => {
            let flip = !this.state.isFlippedPlus5;
            this.setState({ isFlippedPlus5: flip });
        }, 400);
    }

    render() {
       
        return (
            <div className="workstation-body">
                <div className="workstation-card">
                    <Workspace
                        onClick={() => this.flip()}
                        // onClick={() => this.cardFlip(this.props.cardState.flip)}
                        front={this.state.isFlipped}
                        front5={this.state.isFlippedPlus5}>
                            <h2 className={this.state.isFlipped ? "animate-cff" : "animate-cfb"}>{this.state.isFlippedPlus5 ? this.state.frontOfCard : this.state.backOfCard}</h2>
                    </Workspace>
                </div>
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
    colors: state.colors.choices,
    // flip: state.cardState.flip,
    // isFlipped: state.cardState.isFlipped,
    // frontOfCard: state.cardState.frontOfCard,
    // backOfCard: state.cardState.backOfCard
})

export default connect(mapStateToProps, {getColors, getCourseCards, cardFlip})(Workstation);