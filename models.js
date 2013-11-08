var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var roomSchema = new Schema({
                            name: {type: String, unique: true},
                            building: String,
                            capacity: Number,
                            //Features
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
                            room: String,
                            date: Date,
                            time: Number,
                            end: Number,
                            duration: Number, //this is in hours aka 1hour = 1 and 2hours 30 min = 2.5
                            conflicted: Boolean
                          });

var Reservation = mongoose.model('Reservation', resSchema);

exports.Room = Room;
exports.Reservation = Reservation;
