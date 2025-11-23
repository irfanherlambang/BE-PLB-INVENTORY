require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require("http");
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const userRoute = require("./routes/userRoute.js");
const settingRoute = require("./routes/settingRoute.js");
const browseRoute = require("./routes/browseRoute.js");
const tagihanRoute = require("./routes/tagihanRoute.js");

app.use("/user", userRoute);
app.use("/setting", settingRoute);
app.use("/browse", browseRoute);
app.use("/tagihan", tagihanRoute);


const PORT = process.env.PORT || 801;
server.listen(PORT, () => {
  console.log(`The Service running well... at http://localhost:${PORT}`);
});
