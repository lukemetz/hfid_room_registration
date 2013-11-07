var models = require("../models.js");

exports.populate = function(req, res){
  for (var i =0; i < 10; i++) {
    var AC109 = new models.Room({name: "AC 10" + i.toString(),
                              BlackoutCapability: false,
                              HandicapAccessability: false,
                              Softseating: false,
                              TablesChairs: true,
                              Whiteboards: false,
                              Blackboards: true,
                              ProjectionScreen: true,
                              LCDProjector: true,
                              CarpetFlooring: false,
                              TileFlooring: true,
                              Multimedia: false,
                              Benches: i%4,
                              Podium: false,
                              TieredSeating: i%2,
                              DoNotRearrange: true});
      AC109.save(function(err){
          if (err) return ("error saving AC109", err);
          console.log(i.toString() + ' saved');
      });
  }

  res.send("Database Populated");
};
