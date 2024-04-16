
import { eventover } from "../models/eventover.js";

export async function toggleEventEnd(req, res, next) {
  try {
    let over = await eventover.findOne();
    if (over) {
      over.endtime = !over.endtime;
      await over.save();
    } else {
      await eventover.create({ endtime: true });
    }
    return res.status(200).send('Success'); // Sending a success response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getEventEnd(req, res, next) {
  try {
    let over = await eventover.findOne();
    if (!over) {
      await eventover.create({ endtime: true });
      over = await eventover.findOne();
    }
    return res.json({ over: over.endtime }); // Returning the endtime property as JSON
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
// import {eventover} from "../models/eventover.js";
                    
//                     export async function toggleEventEnd(req, res, next) {
//   try {
//       let over = await eventover.findOne();
//       if (over) {
//           over.endtime = !over.endtime;
//           await over.save();
//       } else {
//           // If there's no existing eventover document, create one with endtime set to true
//           await eventover.create({ endtime: true });
//       }
//       return res.ok();
//   } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// export async function getEventEnd(req, res, next) {
//   try {
//       let over = await eventover.findOne();
//       if (!over) {
//           // If there's no existing eventover document, create one with endtime set to true
//           await eventover.create({ endtime: true });
//           over = await eventover.findOne();
//       }
//       // Return the endtime property
//       return res.json({ ended: over.endtime });
//   } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Internal Server Error" });
//   }
// }