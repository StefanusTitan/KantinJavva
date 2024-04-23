const express = require('express');
const mejaController = require('../controllers/mejaControllers');
const isAdmin = require('./../middleware/isAdmin');
const auth = require('./../middleware/auth');

const router = express.Router();

router
    .route("/addMeja")
    .post(auth, isAdmin, mejaController.tambahMeja);

router
    .route("/deleteMeja/:id")
    .delete(auth, isAdmin, mejaController.hapusMeja);

router
    .route("/updateStatusMeja")
    .patch(auth, isAdmin, mejaController.updateStatusMeja);

router
    .route("/getAllTables")
    .get(mejaController.semuaMeja);

router
    .route("/mejaAvailable")
    .get(mejaController.mejaTersedia);

module.exports = router;