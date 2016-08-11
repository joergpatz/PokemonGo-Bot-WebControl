# PokemonGo-Bot-WebControl
Control the [PokemonGo-Bot](https://github.com/PokemonGoF/PokemonGo-Bot) [docker container](https://hub.docker.com/r/joergpatz/pokegobot/) via a simple web interface

## Development Tasks

- [x] module: "Connect to local docker-machine to access Docker Remote API"
- [x] route: run pokego docker container
- [x] route: stop pokego docker container
- [ ] website: create frontpage with basic controls (start, stop, log area, location input)
- [ ] websocket: stream bot output on the website
- [ ] change location: stop container, edit config, start container
- [ ] improve lib: determine docker remote API Accessibility via linux socket or docker-machine