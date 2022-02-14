const express = require('express');
const router = express.Router();

const {getUrls, setUrl, setUrlWithKey,updateUrl, deleteUrl} = require("../controller/urlController");
const {protect, protectWithKey} = require("../middleware/authMiddleware");

router.route("/").get(protect, getUrls).post(protect,setUrl);
router.route("/:id").put(protect, updateUrl).delete(protect,deleteUrl);
router.route("/encrypt").post(protect, setUrlWithKey);

module.exports=router;