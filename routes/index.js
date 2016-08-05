import express from 'express';
let router = express.Router();
import dockerClient from '../lib/docker-client';
import dockerBot from '../lib/docker-bot';

// check whether we can get access to the docker remote API
dockerClient.then(docker => {
    docker.ping((err, pong) => {
        if (err) {
            console.error("[DOCKER] ping:" + err);
            process.exit(1);
        } else {
            console.log("[DOCKER] ping:" + pong);
        }
    });
});

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'PokemonGo-Bot-WebControl'});
});

router.get('/bot/start', (req, res, next) => {

    /*dockerBot(dockerClient).then(result => {
     console.log("Promise Success");
     res.send("Bot started");
     })
     .catch(err => {
     console.error("Promise Failure:", err);
     process.exit(1);
     });*/
    res.send("Bot is sleeping");

});

export default router;
