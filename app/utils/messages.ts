let messageText = {
    improperNotePriveleges: 'You do not have the priveleges to delete this note!!',
    noteDelete: 'You have successfully deleted User note.',
    noteUpdate: 'You have successfully updated User note.',
    invalidNoteDeff: 'The data recieved is not in a valid format for a User Note.',
    
    cardDeletePriveleges: 'You do not have the priveleges to Delete this card!',
    cardUpdatePriveleges: 'You do not have the priveleges to Update this card!',
    noteUpdatePriveleges: 'You are unable to edit this note as it does not belong to you!'
}

let MESSAGES = (arg: string) => {
    return {message: messageText[arg] }
}

export default MESSAGES;