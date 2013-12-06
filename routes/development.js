var mongoose = require('mongoose'),
    models = require("../models.js");

exports.dropDb = function(req, res){
    mongoose.connection.db.dropDatabase();
    res.send("Database Dropped");
}

exports.populate = function(req, res){
  var types = ["Lab","Studio","Lecture"]
  models.Room.remove({}, function(err) {});
  for (var i =0; i < 10; i++) {
    var AC109 = new models.Room({name: "AC 10" + i.toString(),
                              building: "AC",
                              capacity: i*4,
                              TablesChairs: true,
                              Whiteboards: i%3,
                              Blackboards: (i*2+2)%5,
                              ProjectionScreen: true,
                              LCDProjector: i%2,
                              Podium: ((i+1)%2),
                              TieredSeating: i%2,
                              type: types[i%3]});
      AC109.save(function(err){
          if (err) return ("error saving AC109", err);
          console.log(i.toString() + ' saved');
      });
  }
  for (var i =0; i < 10; i++) {
    var AC109 = new models.Room({name: "CC 10" + i.toString(),
                              building: "CC",
                              capacity: i*4,
                              TablesChairs: true,
                              Whiteboards: i%3,
                              Blackboards: (i*2+2)%5,
                              ProjectionScreen: true,
                              LCDProjector: i%2,
                              Podium: ((i+1)%2),
                              TieredSeating: i%2,
                              type: types[i%3]});
      AC109.save(function(err){
          if (err) return ("error saving AC109", err);
          console.log(i.toString() + ' saved');
      });
  }
  for (var i =0; i < 10; i++) {
    var AC109 = new models.Room({name: "MH 10" + i.toString(),
                              building: "MH",
                              capacity: i*4,
                              TablesChairs: true,
                              Whiteboards: false,
                              Blackboards: true,
                              ProjectionScreen: true,
                              LCDProjector: true,
                              Podium: false,
                              TieredSeating: i%2,
                              type: types[i%3]});
      AC109.save(function(err){
          if (err) return ("error saving AC109", err);
          console.log(i.toString() + ' saved');
      });
  }

var reser = new models.Reservation({
                            user: "Sam",
                            name: "HFID Meeting",
                            room: "AC 109",
                            start: new Date(2013, 11, 10, 11),
                            end: new Date(2013, 11, 10, 13),
                            duration: 2,
                            approved: true
                            });
      reser.save(function(err){
          if (err) return ("error saving AC109", err);
          console.log(i.toString() + ' saved');
      });
var reser = new models.Reservation({
                            user: "Sam",
                            name: "HFID Meeting",
                            room: "AC 109",
                            start: new Date(2013, 11, 15, 10),
                            end: new Date(2013, 11, 15, 12),
                            duration: 2,
                            approved: false
                            });
      reser.save(function(err){
          if (err) return ("error saving AC109", err);
          console.log(i.toString() + ' saved');
      });


  res.send("Database Populated");
};
