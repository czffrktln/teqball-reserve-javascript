const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3000;
const authMiddleware = require ('./middleware/auth')
const mongourl = process.env.mongourl

const loginRoute = require("./routes/login");
const teamRoute = require("./routes/team");
const userRoute = require("./routes/user");
const eventRoute = require("./routes/event");

app.use(express.json());
app.use(cors());


app.use(authMiddleware)

app.use("/api/login", loginRoute);
app.use("/api/team", teamRoute);
app.use("/api/user", userRoute);
app.use("/api/event", eventRoute);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    mongourl
  )
  .then(() => {
    console.log("Connection is successful");
    app.listen(port, () => {
      console.log(`App is listening on ${port}`);
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB", err));
