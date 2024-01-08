const cron = require("node-cron");

const task = cron.schedule("* * * * * *", () => {
  console.log("running a task every second");
});

task.start();

setTimeout(() => {
  task.stop();
}, 6000);
