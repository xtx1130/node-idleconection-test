import {promisify as p} from 'node:util'
import http from 'node:http'
import got from 'got'

const psetTimeout = p(setTimeout)

const server = http.createServer(async (req, res) => {
  await psetTimeout(1000)
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen(3000);

const r = got(`http://0.0.0.0:3000/delay`, {
  headers: {
    'Connection': 'close'
  }
}).text()

await psetTimeout(100)

server.closeIdleConnections()
server.close()
console.log(await r)
