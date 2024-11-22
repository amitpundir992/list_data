import { Data } from "../models/user.model.js";



const getData = async (req, res) => {
    
   try {
     const allUsers = await Data.find(); 
     res.status(200).json(allUsers);
   } catch (error) {
     console.log(error);   
   }
};

export {  getData };
