import express from "express";
const router = express.Router();

const totalScore2 = 200; // Assuming the total score
const pictocodescore = 101; 
const audioscore = 102;
const hexascore = 103;
const scriptCode = 'ihsanP'; // Assuming the script code
const scriptCodeAudio = 'ihsanA'; // Assuming the script code
const scriptCodeHexa = 'ihsanH'; // Assuming the script code for HEXA

router.post('/level2', (req, res) => {
    // Assuming JSON data like { "data": "someData" } is sent in the request body
    const data = req.body.data;

    // Now you can use the data as needed
    console.log(data);

    let score2 = 0;
    res.json({ score2, totalScore2, pictocodescore, audioscore,hexascore, scriptCode, scriptCodeAudio, scriptCodeHexa }); 
});
export default router;



// ---------------------
// router.post('/level2', (req, res) => {
//     // Assuming JSON data like { "data": "someData" } is sent in the request body
//     const data = req.body.data;

//     // Now you can use the data as needed
//     console.log(data);

//     let score2 = 0;
//     res.json({ score2, totalScore2, pictocodescore, scriptCode }); 
// });