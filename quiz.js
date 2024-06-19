import express from "express";
import { authMiddleWare } from "./controllers/user.js";
import { Users } from "./models/user.js";
const router = express.Router();

const correctAnswers = {
  q1: "a",
  q2: "b",
  q3: "c",
  q4: "a",
  q5: "c",
  q6: "b",
  q7: "a",
  q8: "c",
  q9: "a",
  q10: "b",
  q11: "c",
  q12: "d",
  q13: "c",
  q14: "a",
  q15: "d",
  q16: "c",
  q17: "d",
  q18: "a",
  q19: "a",
  q20: "a",
  q21: "b",
  q22: "a",
  q23: "c",
  q24: "b",
  q25: "c",

};

// Define totalScore and puzzleScore
const totalScore = 200; // Assuming the total score
const puzzleScore = 100; // Assuming the puzzle score

const scriptCode = [
  ["ihsan", "l1r2"],
  ["l2r1", "l2r2", "l2r3"],
  ["l3r1"],
  ["l4r1", "l4r2"], 
  ["l5c1","l5c2","l5c3","l5c4"]
];

const scores = [[0, 50], [50, 100, 100], [120], [130, 150],[0, 0, 0, 250]];

router.post("/evaluate", authMiddleWare, async (req, res) => {
  try {
    const quizData = req.body;
    let score = 0;

    const { round, level, verificationCode } = quizData;

    const usersPoint = {
      round,
      level,
      score: 0,
    };

    if (!(round == 1 && level == 1) && !(round == 69 && level == 69)) {
      if (verificationCode != scriptCode[level - 1][round - 1]) {
        throw new Error("Invalid verification code");
      }
      score = scores[level - 1][round - 1];
    }

    for (const question in quizData) {
      if (
        quizData.hasOwnProperty(question) &&
        correctAnswers.hasOwnProperty(question)
      ) {
        if (quizData[question] === correctAnswers[question]) {
          score += 2;
        }
      }
    }

    usersPoint.score = score;

    const user = await Users.findById(req?.user?._id);

    const usersRoundPointIdx = user.roundsCompleted.findIndex(
      (a) => a.round === round && a.level === level
    );

    //Update if round and levels details already exists
    //Else push the new round and level details
    //for resubmission

    if (usersRoundPointIdx < 0) {
      user.roundsCompleted.push(usersPoint);
    } else {
      throw new Error("Already submitted this round");
      // user.roundsCompleted[usersRoundPointIdx] = usersPoint;
    }

    await user.save();

    const totalScore = user.roundsCompleted.reduce((acc, curr) => {
      return acc + curr.score;
    }, 0);

    res.json({ score, totalScore, puzzleScore, scriptCode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // Sending totalScore, puzzleScore, and scriptCode along with score
});

export default router;
