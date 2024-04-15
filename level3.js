import express from "express";
const router = express.Router();

const totalScore3 = 200; // Assuming the total score
const mapscore = 100; 

const scriptCodeMap = 'ihsanM'; // Assuming the script code

router.post('/level3', (req, res) => {
    // Assuming JSON data like { "data": "someData" } is sent in the request body
    const data = req.body.data;

    // Now you can use the data as needed
    console.log(data);

    let score3 = 0;
    res.json({ score3, totalScore3, mapscore, scriptCodeMap, }); 
});
export default router;
