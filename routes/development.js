var models = require("../models.js");

exports.populate = function(req, res){
  var AC109 = new models.Room({name: "AC 109", 
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
                            Benches: false,
                            Podium: false,
                            TieredSeating: false,
                            DoNotRearrange: true});
    AC109.save(function(err){
        if (err) return ("error saving AC109", err);
        console.log('AC109 saved');
    });

  res.send("Database Populated");  
};