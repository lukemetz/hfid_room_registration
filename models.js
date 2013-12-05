var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var roomSchema = new Schema({
                            name: {type: String, unique: true},
                            building: String,
                            capacity: Number,
                            type: String,
                            Whiteboards: Boolean,
                            Blackboards: Boolean,
                            Podium: Boolean,
                            ProjectionScreen: Boolean,
                            LCDProjector: Boolean
                            //Features
                            // BlackoutCapability: Boolean,
                            // HandicapAccessability: Boolean,
                            // Softseating: Boolean,
                            // TablesChairs: Boolean,
                            // CarpetFlooring: Boolean,
                            // TileFlooring: Boolean,
                            // Multimedia: Boolean,
                            // Benches: Boolean,
                            // TieredSeating: Boolean,
                            // DoNotRearrange: Boolean
                          });

var Room = mongoose.model('Room', roomSchema);

var resSchema = new Schema({
                            user: String,
                            name: String,
                            room: String,
                            date: Date,
                            time: Number,
                            end: Number,
                            duration: Number, //this is in hours aka 1hour = 1 and 2hours 30 min = 2.5
                            conflicted: Boolean,
                            approved: Boolean
                          });

var Reservation = mongoose.model('Reservation', resSchema);

exports.Room = Room;
exports.Reservation = Reservation;


