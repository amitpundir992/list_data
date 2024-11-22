import { Router } from "express";
import { getData} from "../controllers/user.controller.js";



const router = Router();
 
router.route("/get-data").get(getData)

export default router;