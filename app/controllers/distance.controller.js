const Distance = require("../models/distance.model");



exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const distance = new Distance({
    source: req.body.source,
    dest: req.body.dest,
    km: req.body.km,
    counter: req.body.counter
  });

  Distance.create(distance, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Distance."
      });
      else{ console.log("26" + data);
    res.send(data);}
  });
};

exports.findAll = (req, res) => {
  Distance.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving distances."
      });
    else res.send(data);
  });
};

exports.findPopular = (req, res) => {
  Distance.getPopular((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving distances."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  let src = req.query.source;
  let dest = req.query.dest;
  Distance.findBySrcDest(src, dest,(err, data) => {
    if (err) {
        return res.status(500).send({
          message: "Error retrieving Destination"
        });
    }
    console.log(data);
     return res.status(200).send({data});
  });
};



