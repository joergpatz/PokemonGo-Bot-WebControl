import express from 'express';
let router = express.Router();
import dockerClient from '../lib/docker-client';

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

    res.send("Bot is sleeping");

});

export default router;
