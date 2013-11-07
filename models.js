var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var roomSchema = new Schema({
                            name: {type: String, unique: true},
                            building: String,
                            BlackoutCapability: Boolean,
                            HandicapAccessability: Boolean,
                            Softseating: Boolean,
                            TablesChairs: Boolean,
                            Whiteboards: Boolean,
                            Blackboards: Boolean,
                            ProjectionScreen: Boolean,
                            LCDProjector: Boolean,
                            CarpetFlooring: Boolean,
                            TileFlooring: Boolean,
                            Multimedia: Boolean,
                            Benches: Boolean,
                            Podium: Boolean,
                            TieredSeating: Boolean,
                            DoNotRearrange: Boolean
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
