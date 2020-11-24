const sql = require("./db_connection");
var distance = require('google-distance');
distance.apiKey = 'AIzaSyBxvqGxEvb6ZBnyRTM8isBU_6O-MAfuNiQ';

const Distance = function(distance) {
  this.source = distance.source;
  this.dest = distance.dest.name;
  this.km = distance.km;
  this.counter = distance.counter
};

Distance.findBySrcDest = ((src, dest, result) => {
  sql.query(`SELECT id, km FROM distances WHERE source = '${src}' AND dest = '${dest}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found distance: ", res[0]);
      sql.query(`UPDATE distances SET counter = counter +1 WHERE id = ${res[0].id}`,  (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
      });
      result(null, res[0].km);
      return;
    }
else getDistance(src, dest, (err, res) =>{
  if(err){
    return result(err, null);
  }
  Distance.createIstance(src, dest, res,(err, res1) => {
    if (err) {
      console.log("error: ", err);
      return res1(err, null);
    }
    return result(null, res);
  });
  });
});
});


Distance.getPopular = result => {
  sql.query(`SELECT * FROM distances ORDER BY counter DESC LIMIT 5`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Distance.createIstance = ((src, dest, km, result)=>{
  sql.query(`INSERT INTO  distances(source, dest, km) VALUES('${src}', '${dest}', '${km}')`, (err, res) => {
    console.log(km);
    if (err) {
      console.log("error: ", err);
      return result(err, null);
    }
    return result(null, res);
  });
});

const getDistance = (src, dest, result) =>{
  distance.get(
    {
      origin: src,
      destination: dest
    },
    function(err, data) {
      if (err) return result(err, null);
      console.log("78" +data);
      return result(null, data);
  });
  }


module.exports = Distance;
