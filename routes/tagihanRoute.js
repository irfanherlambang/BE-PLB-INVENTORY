const express = require('express')
const route = express.Router();
const tagihanController = require("../controllers/tagihanController");
const authRole  = require("../middlewares/authRole");

route.use(express.urlencoded({ extended: false }));

route.get("/laporanPenagihan/search", tagihanController.penagihan_search);
route.get("/laporanPenagihan/download", tagihanController.penagihan_download);

route.get("/laporanTagihan/search", tagihanController.tagihan_search);
route.get("/laporanTagihan/export", tagihanController.tagihan_export);

module.exports = route;