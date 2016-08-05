import path from 'path';

const configPath = path.resolve(__dirname, '..', 'configs');

let createOptions = {
    Image: "joergpatz/pokegobot:dev",
    name: "bot1-pokego",
    Tty: true,
    HostConfig: {
        Binds: [configPath + "/config-bot1-dev.json:/usr/src/app/configs/config.json"],
    }
};

let createContainer = docker => {

    return new Promise((resolve, reject) => {
        docker.createContainer(createOptions, (err, result) => {
            if (err) reject(err);
            else resolve(docker.getContainer(result.id));
        });
    });

};

let attachContainer = container => {

    container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
        stream.pipe(process.stdout);
    });

    return container;

};

let startContainer = container => {

    return new Promise(function (resolve, reject) {
        container.start({}, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });

};

export default dockerClient => {

    return dockerClient
        .then(createContainer)
        .then(attachContainer)
        .then(startContainer);

}
