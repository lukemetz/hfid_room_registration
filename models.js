var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var roomSchema = new Schema({
                            name: {type: String, unique: true},
                            Blackout Capability: Boolean,
                            Handicap Accessability: Boolean,
                            Soft seating: Boolean,
                            Tables/Chairs: Boolean,
                            Whiteboards: Boolean,
                            Blackboards: Boolean,
                            Projection Screen: Boolean,
                            LCD Projector: Boolean,
                            Carpet Flooring: Boolean,
                            Tile Flooring: Boolean,
                            Multi-media: Boolean,
                            Benches: Boolean,
                            Podium: Boolean,
                            Tiered seating: Boolean,
                            Do not rearrange room without permission: Boolean
                          });

var Room = mongoose.model('Room', roomSchema);

var resSchema = new Schema({
                            name: String,
                            room: {type: Schema.Types.ObjectId, ref: 'User'},
                            time: Date
                          });

var Reservation = mongoose.model('Reservation', resSchema);

exports.Room = Room;
exports.Reservation = Reservation;