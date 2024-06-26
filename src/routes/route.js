import { Router } from "express";
import { receiveData } from "../controller/addandgetdata.js";
import { sendData } from "../controller/addandgetdata.js";

const router = Router();

router.route("/").get(sendData).post(receiveData);

export default router;
