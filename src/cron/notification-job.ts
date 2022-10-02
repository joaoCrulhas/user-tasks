const schedule = require('node-schedule');
import { UserService } from "../services/user/index"

const job = schedule.scheduleJob('* * * * *', function() {
    // const userService = new UserService();
    // const allUsers =
    console.log('The answer to life, the universe, and everything!');
});