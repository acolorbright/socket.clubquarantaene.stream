const params = {
  // logging stuff
  logRoomsDataOnConnect: {
    log: false,
    logAll: true,
  },
  logUserSocketConnected: true,

  // general
  updateUserCount: true,
  updateUserCountFrequency: 5000,
  checkIfUserInRoom: true, //checks if the user is in the room he's trying to send a message to (checks only cubicles)
  checkOnlyIfUserInCubicle: false,
  messageOnPeopleEnteringRoom: true,

  //cubicles
  cubiclesAmount: 20, //this is not updated dynamically on the frontend yet (X cubicles + 1 mainfloor)
  maxUsersPerCubicle: 8,

  //db
  usersCollectionName: 'users',
  messagesCollectionName: 'messages',

  // careful
  useDatabase: true,
};

module.exports = params;
