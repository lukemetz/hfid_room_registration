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

exports.reservations = function(req, res) {
  id = req.query.room_id;
  res.json([
    {
      room_id: id
    }]);
};
