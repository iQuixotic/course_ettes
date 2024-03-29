import React from "react";
import { Backdrop } from "..";
import './modal.sass';

// for mobile and modals
const Modal = (props) => {
    return(
        <div>
            <Backdrop />
            <div className='modal'>
                <div onClick={props.close} className='x-close-modal'>X</div>
                {props.type === 'select' ? (
                    <div className='modal-select'>
                        <div className='heading'>Select a Deck</div>
                        <div className='breakline'></div>
                            <p onClick={props.prevDeck}>   Carrot   </p>{props.decksOwned} <p onClick={props.nextDeck}>   Carrot   </p>
                        <div className='modal-button-area buttons-div'>
                            <button onClick={props.deckSelect}>Select Deck</button>
                            <button onClick={props.close}>Close</button>
                        </div>
                    </div>
                ): null}
                {props.type === 'create' ? (
                    <div className='modal-create'>
                        <div className='heading'>Create a New Deck</div>
                        <div className='breakline'></div>
                        <div className='out-of-flow-cardNum'>Cards in deck: {props.cardNum}</div>
                        <div className='deck-name'>
                            <label>Deck Name </label>
                            <input name='sendingDeckName'  onChange={props.inputChange} className='common-input' type='text'></input>
                        </div>
                        <div className='create-new-cards'>
                            <label>Front Content </label>
                            <input onChange={props.inputChange} name='sendingFrontContent'
                            className='front-content card-content' type='text'></input>
                            <div className='back-content-div'>
                                <label>Back Content </label>
                                <textarea   onChange={props.inputChange} name='sendingBackContent' className='card-content back-content'/>
                            </div>
                            {props.messageBool ? (
                                <div className={`modal-message-div ${props.messageType}`} >
                                    {props.message.map(el => (<p>{el}</p>))}
                                </div>
                            ): null}
                            <div className='buttons-div'>
                                <button onClick={props.addCard}>Add Card</button>
                                <button onClick={props.close}>Done</button>
                            </div>
                        </div>
                    </div>
                ): null}
                {props.type === 'delete' ? (
                    <div className='modal-delete'>
                        <div className='heading'>Select a Deck</div>
                        <div className='breakline'></div>
                          Are you sure you want to delete this deck forever?
                        <div className='modal-button-area buttons-div'>
                            <button onClick={props.deckDelete}>Delete</button>
                            <button onClick={props.close}>Close</button>
                        </div>
                    </div>
                ): null}
            </div>
        </div>
    );
}

export default Modal;