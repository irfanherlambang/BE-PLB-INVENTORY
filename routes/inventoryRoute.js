const express = require('express')
const route = express.Router();
const inventoryController = require("../controllers/inventoryController");

route.use(express.urlencoded({ extended: false }));

route.get("/dokumen/search", inventoryController.dokumen_search);
route.get("/dokumen/lihatPengajuan/:id", inventoryController.dokumen_lihatPengajuan);
route.get("/dokumen/history/:id", inventoryController.dokumen_history);
route.get("/dokumen/respondoc/:id", inventoryController.dokumen_respondoc);


module.exports = route;