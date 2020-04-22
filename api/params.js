const params = {
  // logging stuff
  logRoomsDataOnConnect: false,
  logUserSocketConnected: true,

  // general
  updateUserCount: true,
  updateUserCountFrequency: 10000,
  checkIfUserInRoom: true, //checks if the user is in the room he's trying to send a message to (checks only cubicles)
  checkOnlyIfUserInCubicle: false,
  messageOnPeopleEnteringRoom: true,

  //cubicles
  cubiclesAmount: 20, //this is not updated dynamically on the frontend yet (X cubicles + 1 mainfloor)
  maxUsersPerCubicle: 4,
};

module.exports = params;
