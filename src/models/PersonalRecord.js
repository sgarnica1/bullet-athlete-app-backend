const mongoose = require("mongoose");
const models = require("./utils");

const personalRecordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.user,
      required: true,
    },
    movement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.movement,
      required: true,
    },
    scoreNum: {
      type: Number,
      required: false,
    },
    scoreTime: [
      {
        minutes: {
          type: Number,
          required: false,
        },
        seconds: {
          type: Number,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(models.personalRecord, personalRecordSchema);
