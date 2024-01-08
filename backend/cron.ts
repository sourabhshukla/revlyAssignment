const cron = require("node-cron");
import { query } from "./db/index";

const task = cron.schedule("* * * * * *", async () => {
  const result = await query(
    `SELECT COUNT(*)
FROM TutorAvailability
WHERE last_ping_time >= NOW() - INTERVAL '2 seconds';
`,
    []
  );
  console.log(result.rows);
});

task.start();

setTimeout(() => {
  task.stop();
}, 6000);
