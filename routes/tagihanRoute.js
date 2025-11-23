const express = require('express')
const route = express.Router();
const tagihanController = require("../controllers/tagihanController");
const authRole  = require("../middlewares/authRole");

route.use(express.urlencoded({ extended: false }));

route.get("/laporanPenagihan/search", authRole([1]), tagihanController.penagihan_search);
route.get("/laporanPenagihan/download", authRole([1]), tagihanController.penagihan_download);

route.get("/laporanTagihan/search", authRole([3]), tagihanController.tagihan_search);
route.get("/laporanTagihan/export", authRole([3]), tagihanController.tagihan_export);

module.exports = route;