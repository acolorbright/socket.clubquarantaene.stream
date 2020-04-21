require('dotenv').config();

module.exports = () => {
  const params = {
    //cubicles
    cubiclesAmount: 20, //this is not updated dynamically on the frontend yet
    maxUsersPerCubicle: 8,
  };

  return params;
};
