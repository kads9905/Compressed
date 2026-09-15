import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    // Start Express only after MongoDB is connected
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Server failed to start", err);
  });