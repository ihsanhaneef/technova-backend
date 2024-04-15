import mongoose from "mongoose";

const eventoverSchema = mongoose.Schema({
    endtime: {
        type: Boolean,
        default: false
    },
    
});
const eventover = mongoose.model('event over', eventoverSchema);

export  {eventover};