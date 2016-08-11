import express from 'express';
import dockerClient from '../lib/docker-client';
import DockerBot from '../lib/DockerBot';

let router = express.Router();
let bot1 = new DockerBot('bot1-pokego', dockerClient);

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'PokemonGo-Bot-WebControl'});
});

router.get('/bot/start', (req, res, next) => {

    bot1.run().then(result => {
         console.log("Promise Success", result);
         res.send("Bot started");
     })
     .catch(err => {
        console.error("Promise Failure:", err);
        process.exit(1);
     });

});

router.get('/bot/stop', (req, res, next) => {

    bot1.stop().then(result => {
        console.log("Promise Success", result);
        res.send("Bot stopped");
    })
    .catch(err => {
        console.error("Promise Failure:", err);
        process.exit(1);
    });

});

export default router;
