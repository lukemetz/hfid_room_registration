/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.rooms = function(req, res) {
  res.json([
      {
        room_name: "AC 102",
        room_id: 1,
      }
      ]);
};

exports.reservations = function(req, res) {
  id = req.query.room_id;
  res.json([
    {
      room_id: id
    }]);
};
