import http from 'http';

describe('Student API', () => {
  it('should create a student', (done) => {
    const data = JSON.stringify({
      name: 'Alice',
      gender: 'F',
      age: 22,
    });

    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/create-student',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => (body += chunk));
      res.on('end', () => {
        expect(res.statusCode).toBe(201);
        expect(JSON.parse(body).message).toBe('Student created');
        done();
      });
    });

    req.write(data);
    req.end();
  });
});
