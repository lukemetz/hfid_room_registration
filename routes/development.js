var mongoose = require('mongoose'),
    models = require("../models.js");

exports.dropDb = function(req, res){
    mongoose.connection.db.dropDatabase();
    res.send("Database Dropped");
}

exports.populate = function(req, res){
  var AC102 = new models.Room({name: "AC 102", 
                            BlackoutCapability: true,
                            HandicapAccessability: true,
                            Softseating: true,
                            TablesChairs: true,
                            Blackboards: true,
                            ProjectionScreen: true,
                            LCDProjector: true,
                            TileFlooring: true,
                            DoNotRearrange: true});
    AC102.save(function(err){
        if (err) return ("error saving AC102", err);
        console.log('AC102 saved');
    });
    var AC109 = new models.Room({name: "AC 109", 
                            BlackoutCapability: false,
                            HandicapAccessability: true,
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