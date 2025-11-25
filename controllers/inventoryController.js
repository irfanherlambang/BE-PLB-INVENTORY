const express = require('express')
const { DB } = require('../config/conf')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const ExcelJS = require("exceljs");

module.exports = {

    dokumen_search: async function (req, res) {
        try {
            const { nomorJob,
                jenisPengajuan,
                referensi,
                dokumen,
                importirExportir,
                pengajuanVia,
                tdsStatus,
                mandiriStatus } = req.query;

            const dataPath = path.join(__dirname, '../sample/DokumenInventory.json');
            const rawData = fs.readFileSync(dataPath);
            const data = JSON.parse(rawData);

            res.status(200).json({ kode: 200, data });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    dokumen_lihatPengajuan: async function (req, res) {
        try {
            const id = req.params.id;
            const dataPath = path.join(__dirname, '../sample/LihatPengajuan.json');
            const rawData = fs.readFileSync(dataPath);
            const data = JSON.parse(rawData);

            res.status(200).json({ kode: 200, data });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    dokumen_history: async function (req, res) {
        try {
            const id = req.params.id;

            const dataPath = path.join(__dirname, '../sample/RiwayatOrder.json');
            const rawData = fs.readFileSync(dataPath);
            const data = JSON.parse(rawData);

            res.status(200).json({ kode: 200, data });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    dokumen_respondoc: async function (req, res) {
        try {
            const orderId = req.params.id;

            const dataPath = path.join(__dirname, '../sample/ResponDokumen.json');
            const raw = fs.readFileSync(dataPath, 'utf8');
            const json = JSON.parse(raw);

            const responses = json.data.filter(item => item.orderId === orderId);

            return res.status(200).json({
            kode: 200,
            data: responses
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ kode: 500, message: "Server error" });
        }
    }




}