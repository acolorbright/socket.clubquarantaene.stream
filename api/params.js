const params = {
  // logging stuff
  logRoomsOnConnect: false,

  // general
  updateUserCount: true,
  updateUserCountFrequency: 10000,

  //cubicles
  cubiclesAmount: 20, //this is not updated dynamically on the frontend yet (X cubicles + 1 mainfloor)
  maxUsersPerCubicle: 8,
};

module.exports = params;
