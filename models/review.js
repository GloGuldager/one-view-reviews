const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewerID: { type: String, required: true },
  reviewerName: { type: String, required: true },
  summary: String,
  reviewText: String,
  date: { type: Date, default: Date.now }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
