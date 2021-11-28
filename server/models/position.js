
const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
    positionName: {
        type: String,
    },
    positionProtocol: {
        type: String
    },
    positionAsset: {
        type: Number,
    },
    positionAssetType: {
        type: String
    }
});

const Position =  mongoose.model("Position", PositionSchema);
module.exports = Position; 