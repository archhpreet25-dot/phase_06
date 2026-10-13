import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Feedback from "./models/feedback.js";
const app = express();


app.use(express.json());


app.use(express.static("../Frontend"));



mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(4400, () => {
      console.log("Server running at http://localhost:4400");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log(error.message);
  });



app.post("/feedback", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const feedback = new Feedback({
      name,
      rating,
      comment
    });

    await feedback.save();

    res.status(201).json({
      message: "Feedback saved successfully",
      feedback
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to save feedback",
      error: error.message
    });
  }
});




app.get("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find();

    res.json(feedback);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch feedback",
      error: error.message
    });
  }
});



