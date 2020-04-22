const params = {
  // logging stuff
  logRoomsOnConnect: false,

  // general
  updateUserCount: true,
  updateUserCountFrequency: 10000,
  checkIfUserInRoom: true, //checks if the user is in the room he's trying to send a message to (checks only cubicles)

  //cubicles
  cubiclesAmount: 20, //this is not updated dynamically on the frontend yet (X cubicles + 1 mainfloor)
  maxUsersPerCubicle: 3,
};

module.exports = params;
