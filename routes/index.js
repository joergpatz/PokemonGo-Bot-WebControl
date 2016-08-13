import express from 'express';
import dockerClient from '../lib/docker-client';
import DockerBot from '../lib/DockerBot';

let router = express.Router();

// check whether it can get access to the docker remote API
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

router.get('/', (req, res, next) => {
    res.render('index', {title: 'PokemonGo-Bot-WebControl'});
});

router.get('/bot/:name/start', (req, res, next) => {

    let bot = new DockerBot(req.params.name, dockerClient);

    bot.run().then(result => {
         console.log("Promise Success", result);
         res.send("Bot started");
     })
     .catch(err => {
        console.error("Promise Failure:", err);
        process.exit(1);
     });

});

router.get('/bot/:name/stop', (req, res, next) => {

    let bot = new DockerBot(req.params.name, dockerClient);

    bot.stop().then(result => {
        console.log("Promise Success", result);
        res.send("Bot stopped");
    })
    .catch(err => {
        console.error("Promise Failure:", err);
        process.exit(1);
    });

});

export default router;
