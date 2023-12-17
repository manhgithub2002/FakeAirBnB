const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

const notificationRouter = require("./routes/notifications");
const userRouter = require("./routes/user");

const countryRouter = require("./routes/countries");
const placeRouter = require("./routes/places");
const propertyRouter = require("./routes/properties");
const facilityRouter = require("./routes/facilities");
const orderRouter = require("./routes/orders");
const conversationRouter = require("./routes/conversations");

app.use(cors());
app.use(express.json());
app.use("/notifications", notificationRouter);

app.use("/api/users", userRouter);
app.use("/api/countries", countryRouter);
app.use("/api/places", placeRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/facilities", facilityRouter);
app.use("/api/orders", orderRouter);
app.use("/api/conversations", conversationRouter);
// app.use("./api/countries", countriesRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
