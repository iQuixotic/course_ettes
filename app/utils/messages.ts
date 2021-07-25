let messageText = {

    // register messages
     missingPass: 'Please enter a valid password',
     missingFirstName: 'Please enter a valid first name',
     missingLastName: 'Please enter a valid last name',
     missingEmail: 'Please enter a valid email',
     alreadyExists: 'A user with this email already exists',

    // deck messages
    deckDeffError: 'The deck is not in the correct format',
    deckAdded: 'New deck successfully added!',
    cannotGetOwnedDecks: 'Cannot get owned decks.',
    cannotGetSubscribedDecks: 'Cannot get subscribed decks.',

    // card messages
    cardDeletePrivileges: 'You do not have the priveleges to Delete this card!',
    cardUpdatePrivileges: 'You do not have the priveleges to Update this card!',
    generalCardError: 'Could not get cards.',
    cardAddError: 'There was a problem adding the card to the database.',
    cardAdd: 'Card successfully added.',
    cardUpdated: 'Card successfully updated.',
    cardUpdateError: 'There were some issues. Unable to process card edit at this time.',
    cardRemoved: 'Card successfully deleted.',
    cardRemovedError: 'There was an issue deleting the card.',

    //note messages
    noteForCardAdd: 'Note successfully added to card.',
    noteDeletePrivileges: 'You are unable to delete this note as it does not belong to you!',
    noteUpdatePriveleges: 'You are unable to edit this note as it does not belong to you!',
    invalidNoteDeff: 'The data recieved is not in a valid format for a User Note.',
    improperNotePriveleges: 'You do not have the priveleges to delete this note!!',
    noteDelete: 'You have successfully deleted User note.',
    noteUpdate: 'You have successfully updated User note.'
}

let MESSAGES = (arg: string) => {
    return {[arg]: messageText[arg]}
}

export default MESSAGES;