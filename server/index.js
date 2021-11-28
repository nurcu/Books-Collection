const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PositionModel = require("./models/position");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb://localhost:27017/curcumy04",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.post("/insert", async (req, res) => {
    const positionName = req.body.positionName;
    const positionAsset = req.body.positionAsset;
    const positionProtocol = req.body.positionProtocol;
    const positionAssetType = req.body.positionAssetType
    const position = new PositionModel({positionName: positionName, positionAsset: positionAsset, positionProtocol: positionProtocol, positionAssetType: positionAssetType});

    try {
        await position.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err);
    }
});

app.get("/read", async (req, res) => {
    // FoodModel.find({$where: {foodName:  "Apple"}}, )
    PositionModel.find({}, (err, results) => {
        if (err) {
            res.send(err);
        }

        res.send(results);
    });
});

app.put("/update", async (req, res) => {
    const id = req.body.id;
    const positionName = req.body.positionName;
    const positionProtocol = req.body.positionProtocol;
    const positionAsset = req.body.positionAsset;
    const positionAssetType = req.body.positionAssetType;
    try {
        await PositionModel.findById(id, (err, updatePosition) => {
            updatePosition.positionName = positionName;
            updatePosition.positionProtocol = positionProtocol;
            updatePosition.positionAsset = positionAsset;
            updatePosition.positionAssetType = positionAssetType;
            updatePosition.save();
            res.send("updated");
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await PositionModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

app.listen(3004, () => {
    console.log("server runnig on port 3004");
});
