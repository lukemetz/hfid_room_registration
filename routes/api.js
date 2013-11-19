/*
 * Serve JSON to our AngularJS client
 */
var models = require("../models.js");

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.rooms = function(req, res) {
  var rooms = models.Room.find({}, function(err, models) {
    res.json(models);
  });
};

exports.rooms_list = function(req, res) {
  var rooms = models.Room.find({}, function(err, models) {
    list = [];
    for(var i=0; i < models.length; i++) {
      list.push(models[i].name)
    }
    res.json(list);
  });
};

exports.reservations = function(req, res) {
  id = req.query.room_id;
  var r = function(name, start, end) {
    return {
      room: name,
      start: start,
      end: end
    }
  }
  var month = 11;
  var day = 10;
  res.json([
      r("AC 109", new Date(2013, month, day, 11, 13), new Date(2013, month, day, 11, 15)),
      r("AC 109", new Date(2013, month, day, 11, 16), new Date(2013, month, day, 11, 18)),
      r("AC 101", new Date(2013, month, day, 12, 13), new Date(2013, month, day, 12, 15)),
      r("AC 101", new Date(2013, month, day, 12, 16), new Date(2013, month, day, 12, 18)),
      r("AC 102", new Date(2013, month, day, 13, 13), new Date(2013, month, day, 13, 15)),
      r("AC 102", new Date(2013, month, day, 13, 16), new Date(2013, month, day, 13, 18)),

      r("CC 109", new Date(2013, month, day, 11, 13), new Date(2013, month, day, 11, 15)),
      r("CC 109", new Date(2013, month, day, 11, 16), new Date(2013, month, day, 11, 18)),
      r("CC 101", new Date(2013, month, day, 12, 13), new Date(2013, month, day, 12, 15)),
      r("CC 101", new Date(2013, month, day, 12, 16), new Date(2013, month, day, 12, 18)),
      r("CC 102", new Date(2013, month, day, 13, 13), new Date(2013, month, day, 13, 15)),
      r("CC 102", new Date(2013, month, day, 13, 16), new Date(2013, month, day, 13, 18)),

      r("MH 109", new Date(2013, month, day, 11, 13), new Date(2013, month, day, 11, 15)),
      r("MH 109", new Date(2013, month, day, 11, 16), new Date(2013, month, day, 11, 18)),
      r("MH 101", new Date(2013, month, day, 12, 13), new Date(2013, month, day, 12, 15)),
      r("MH 101", new Date(2013, month, day, 12, 16), new Date(2013, month, day, 12, 18)),
      r("MH 102", new Date(2013, month, day, 13, 13), new Date(2013, month, day, 13, 15)),
      r("MH 102", new Date(2013, month, day, 13, 16), new Date(2013, month, day, 13, 18)),
    ]);
};
