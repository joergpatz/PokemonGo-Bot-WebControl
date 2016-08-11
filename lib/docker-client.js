import fs from 'fs';
import dockermachine from 'dockermachine';
import Dockerode from 'dockerode';

let dockerPromise = dockermachine.inspect("default")
    .then(info => {
        return new Dockerode({
            host: info.Driver.IPAddress,
            port: 2376,
            ca: fs.readFileSync(info.HostOptions.AuthOptions.CaCertPath),
            cert: fs.readFileSync(info.HostOptions.AuthOptions.ClientCertPath),
            key: fs.readFileSync(info.HostOptions.AuthOptions.ClientKeyPath),
        });
    });

export default dockerPromise;
