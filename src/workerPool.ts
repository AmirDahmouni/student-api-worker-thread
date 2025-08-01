import { Worker } from 'worker_threads';
import path from 'path';

const MAX_WORKERS = 3;
let running = 0;
const queue: { student: any; callback: Function }[] = [];

export function runTask(student: any, callback: Function) {
  const execute = () => {
    running++;
    const worker = new Worker(path.resolve(__dirname, './workers/writeStudent.js'));

    worker.postMessage(student);

    worker.on('message', (msg) => {
      running--;
      callback(null, msg);
      if (queue.length > 0) {
        const next = queue.shift();
        if (next) runTask(next.student, next.callback);
      }
    });

    worker.on('error', (err) => {
      running--;
      callback(err);
    });
  };

  if (running < MAX_WORKERS) {
    execute();
  } else {
    queue.push({ student, callback });
  }
}
