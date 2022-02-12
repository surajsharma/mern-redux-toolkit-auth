const express = require('express');
const router = express.Router();

const {getUrls, setUrl, updateUrl, deleteUrl} = require("../controller/urlController");
const {protect} = require("../middleware/authMiddleware");

router.route("/").get(protect, getUrls).post(protect,setUrl);
router.route("/:id").put(protect, updateUrl).delete(protect,deleteUrl);

module.exports=router;