# PMTool-Cards-Frontend

## Installation for local development

1. Instal dependencies

```
npm i
```

2. Start app in development mode

```
npm run dev
```

## Installation for production

1. Build docker image

```
docker build -t pmtool-cards-reactjs-front:latest .
```

2. Run docker container

```
docker run --rm --name pmtool-cards-reactjs-front -p 80:80 -d pmtool-cards-reactjs-front:latest
```

**Have fun!**
