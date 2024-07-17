// Cron job to hit endpoint every 14 sec to keep backend alive always

import cron from "cron";
import https from "https";

const backendUrl = 'https://technova-backend.onrender.com' ;
const job = new cron.CronJob('*/14 * * * *', function () {
    // This function will be executed every 14 minutes.
    console.log(`Restarting server`);

    // Perform an HTTPS GET request to hit any backend api.
    https.get(backendUrl, (res) => {
        if (res.statusCode === 200) {
            console.log("Server restarted");
        } else {
            console.error(
                `failed to restarted server with status code: ${res.statusCode}`
            );
        }
    })
    .on('error', (err) => {
        console.error('Error during Restart: ', err.message);
    });
});

// Export the cron job.

export default job;
