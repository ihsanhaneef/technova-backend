
import {eventover} from "../models/eventover.js";


// export async function toggleEventEnd(req, res, next) {
//     try {
//       const over = await eventover.findOne();
//       if(over){
//         over.endtime = !over.endtime
//         await over.save();
//       }
//     await eventover.create({endtime:true})
      
  
//       return res.ok();
//     } catch (error) {
//       return res.status(401).json({ message: "Unauthorized - Invalid token" });
//     }
//   }
  
//   export async function getEventEnd(req, res, next) {
//     try {
//       let over = await eventover.findOne();
//       if(over){
//         await over.save();
//       }
//       else{
//         await eventover.create();
//         over = await eventover.findOne();
//       }
//     await eventover.create({ended:over.endtime})
      
  
//       return res.ok();
//     } catch (error) {
//       return res.status(401).json({ message: "Unauthorized - Invalid token " });
//     }
//   }

export async function toggleEventEnd(req, res, next) {
  try {
      let over = await eventover.findOne();
      if (over) {
          over.endtime = !over.endtime;
          await over.save();
      } else {
          // If there's no existing eventover document, create one with endtime set to true
          await eventover.create({ endtime: true });
      }
      return res.ok();
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getEventEnd(req, res, next) {
  try {
      let over = await eventover.findOne();
      if (!over) {
          // If there's no existing eventover document, create one with endtime set to true
          await eventover.create({ endtime: true });
          over = await eventover.findOne();
      }
      // Return the endtime property
      return res.json({ ended: over.endtime });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
}