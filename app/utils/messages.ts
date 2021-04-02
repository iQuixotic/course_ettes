let messageText = {

   


    // card messages
    cardDeletePriveleges: 'You do not have the priveleges to Delete this card!',
    cardUpdatePriveleges: 'You do not have the priveleges to Update this card!',

    //note messages
    noteUpdatePriveleges: 'You are unable to edit this note as it does not belong to you!',
    invalidNoteDeff: 'The data recieved is not in a valid format for a User Note.',
    improperNotePriveleges: 'You do not have the priveleges to delete this note!!',
    noteDelete: 'You have successfully deleted User note.',
    noteUpdate: 'You have successfully updated User note.'
}

let MESSAGES = (arg: string) => {
    return {message: messageText[arg] }
}

export default MESSAGES;