import http from 'http';
import { runTask } from './workerPool';

const server = http.createServer((req, res) => {
  if (req.url === '/create-student' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const data = JSON.parse(body);
      const student = {
        name: data.name,
        gender: data.gender,
        age: data.age,
      };

      runTask(student, (err: any, result: any) => {
        if (err || !result.success) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Error creating student' }));
        } else {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Student created' }));
        }
      });
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});
