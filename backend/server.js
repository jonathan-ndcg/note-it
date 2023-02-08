const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const indexRoutes = require("./routes/routeindex");

dotenv.config();

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', indexRoutes);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
