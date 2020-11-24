module.exports = app => {
    const distances = require("../controllers/distance.controller");
    
    app.get("/getDist", distances.findOne);
    app.get("/getPopular", distances.findPopular)
  };
  