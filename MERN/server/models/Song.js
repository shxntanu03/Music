import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    songName:String,
    filmName:String,
    musicDirector:String,
    singer:String,
    actor:String,
    actress:String,
});

const SongModel = mongoose.model('song details',SongSchema);
export default SongModel;