module.exports = {
  senscalPool: {
    user: process.env.SENSCAL_USER,
    password: process.env.SENSCAL_PASSWORD,
    connectString: process.env.SENSCAL_CONNECTIONSTRING,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};
