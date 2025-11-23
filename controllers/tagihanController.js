const express = require('express')
const { DB } = require('../config/conf')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const ExcelJS = require("exceljs");

module.exports = {
    tagihan_search: async function (req, res) {
        try {
            const { nomorAju, nomorReferensi, nomorInvoice, jumlah, tglDibuat, status, searchBy, searchValue } = req.query;
            //console.log('Tagihan Search Request : ', req.query);
            const dataPath = path.join(__dirname, '../sample/LaporanTagihan.json');
            const rawData = fs.readFileSync(dataPath);
            let data = JSON.parse(rawData);

            data = data.filter(item => {
                if (nomorAju && item.nomor_aju !== nomorAju) return false;
                if (nomorReferensi && item.nomor_referensi !== nomorReferensi) return false;
                if (nomorInvoice && item.nomor_invoice !== nomorInvoice) return false;
                if (jumlah && item.jumlah != jumlah) return false;
                if (tglDibuat && item.tanggal_dibuat !== tglDibuat) return false;
                if (status && item.status.toLowerCase() !== status.toLowerCase()) return false;

                // partial search for nomor_job, etc.
                if (searchBy && searchValue) {
                    const fieldMap = {
                        nomor_job: 'nomor_job',
                        nomor_aju: 'nomor_aju',
                        nomor_referensi: 'nomor_referensi',
                        nomor_invoice: 'nomor_invoice',
                        tanggal_dibuat: 'tanggal_dibuat',
                    };

                    const field = fieldMap[searchBy];
                    if (field && !item[field].toLowerCase().includes(searchValue.toLowerCase())) {
                        return false;
                    }
                }

                return true;
            });

            res.status(200).json({ kode: 200, data });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    tagihan_export: async function (req, res) {
        res.json({ message: "tagihan_export belum dibuat" });
    },

    penagihan_search: async function (req, res) {
        try {
            const { nomorInvoice, namaPerusahaan, tanggalInvoice, nomorFaktur, periode, tanggalBatasPembayaran, jumlah, tanggalBayar, status, searchBy, searchValue } = req.query;
            //console.log('Tagihan Search Request : ', req.query);
            const dataPath = path.join(__dirname, '../sample/LaporanPenagihan.json');
            const rawData = fs.readFileSync(dataPath);
            let data = JSON.parse(rawData);

            data = data.filter(item => {
                if (nomorInvoice && item.nomor_invoice !== nomorInvoice) return false;
                if (namaPerusahaan && item.nama_perusahaan !== namaPerusahaan) return false;
                if (tanggalInvoice && item.tanggal_invoice !== tanggalInvoice) return false;
                if (nomorFaktur && item.nomor_faktur != nomorFaktur) return false;
                if (periode && item.periode !== periode) return false;
                if (tanggalBatasPembayaran && item.tanggal_batas_pembayaran !== tanggalBatasPembayaran) return false;
                if (jumlah && item.jumlah != jumlah) return false;
                if (tanggalBayar && item.tanggal_bayar !== tanggalBayar) return false;
                if (status && item.status.toLowerCase() !== status.toLowerCase()) return false;

                // partial search for nomor_invoice, etc.
                if (searchBy && searchValue) {
                    const fieldMap = {
                        nomor_invoice: 'nomor_invoice',
                        tanggal_invoice: 'tanggal_invoice',
                        tanggal_batas_pembayaran: 'tanggal_batas_pembayaran',
                    };

                    const field = fieldMap[searchBy];
                    if (field && !item[field].toLowerCase().includes(searchValue.toLowerCase())) {
                        return false;
                    }
                }

                return true;
            });

            res.status(200).json({ kode: 200, data });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    penagihan_download: async function (req, res) {
        try {
            const { nomorInvoice, namaPerusahaan, tanggalInvoice, nomorFaktur, periode, tanggalBatasPembayaran, jumlah, tanggalBayar } = req.query;
            const dataPath = path.join(__dirname, "../sample/LaporanPenagihan.json");
            const rawData = fs.readFileSync(dataPath);
            const data = JSON.parse(rawData);

            // === Generate Excel ===
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Laporan Penagihan");
            // header kolom
            worksheet.columns = [
                { header: "Nomor Invoice", key: "nomor_invoice", width: 20 },
                { header: "Nama Perusahaan", key: "nama_perusahaan", width: 25 },
                { header: "Tanggal Invoice", key: "tanggal_invoice", width: 10 },
                { header: "Nomor Faktur", key: "nomor_faktur", width: 12 },
                { header: "Periode", key: "periode", width: 12 },
                { header: "Tanggal Batas Pembayaran", key: "tanggal_batas_pembayaran", width: 18 },
                { header: "Jumlah", key: "jumlah", width: 18 },
                { header: "Tanggal Bayar", key: "tanggal_bayar", width: 12 }
            ];

            // isi data ke sheet
            data.forEach((item) => {
                worksheet.addRow(item);
            });

            // styling header biar rapi
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF2563EB" }, };
                cell.alignment = { vertical: "middle", horizontal: "center" };
            });

            // === Auto Fit Row Height ===
            worksheet.eachRow((row) => {
                row.height = 20;
            });

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=Laporan_Penagihan.xlsx");
            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            console.error(error);
            if (!res.headersSent) {
                res.status(500).json({ kode: 500, message: "Gagal export Excel", error });
            }
        }
    },
}