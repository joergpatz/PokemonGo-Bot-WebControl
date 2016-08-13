import path from 'path';
import util from 'util';

let instance = {};
let id = Symbol();
let name = Symbol();
let docker = Symbol();
let create = Symbol();
let attach = Symbol();
let start = Symbol();

export default class {

    //multiton constructor
    constructor(botName, dockerClient) {
        if(instance && instance[botName]) {
            return instance[botName];
        }

        this[name] = botName;
        this[docker] = dockerClient;

        instance[botName] = this;

        return instance[botName];
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
