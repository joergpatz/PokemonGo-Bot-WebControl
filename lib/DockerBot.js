import path from 'path';
import util from 'util';

var id = Symbol();
var name = Symbol();
var docker = Symbol();
var create = Symbol();
var attach = Symbol();
var start = Symbol();

export default class {

    constructor(botName, dockerClient) {
        this[name] = botName;
        this[docker] = dockerClient;

        // check whether it can get access to the docker remote API
        this[docker].then(docker => {
            docker.ping((err, pong) => {
                if (err) {
                    console.error("[DOCKER] ping:" + err);
                    process.exit(1);
                } else {
                    console.log("[DOCKER] ping:" + pong);
                }
            });
        });
    }

    [create]() {

        const configPath = path.resolve(
            __dirname,
            '..',
            'configs',
            util.format('%s.json', this[name])
        );
        const createOptions = {
            Image: "joergpatz/pokegobot:dev",
            name: this[name],
            Tty: true,
            HostConfig: {
                Binds: [configPath + ":/usr/src/app/configs/config.json"]
            }
        };

        return new Promise((resolve, reject) => {
            this[docker].then(docker => {
                docker.createContainer(createOptions, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        this[id] = result.id;
                        resolve(docker.getContainer(result.id));
                    }
                });
            });
        });

    }

    [attach](container) {

        container.attach({stream: true, stdout: true, stderr: true}, (err, stream) => {
            stream.pipe(process.stdout);
        });

        return container;

    }

    [start](container) {

        return new Promise((resolve, reject) => {
            container.start((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

    }

    run() {

        return this[create]()
            .then(this[attach])
            .then(this[start])

    }

    stop() {

        return new Promise((resolve, reject) => {
            this[docker].then(docker => {
                docker.getContainer(this[id]).stop((err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        });

    }

};
