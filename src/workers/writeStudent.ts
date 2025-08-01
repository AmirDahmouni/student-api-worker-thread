import { parentPort } from 'worker_threads';
import { pool } from '../db';

type Student = {
  name: string;
  gender: string;
  age: number;
};

parentPort?.on('message', async (student: Student) => {
  try {
    await pool.query(
      'INSERT INTO students (name, gender, age) VALUES ($1, $2, $3)',
      [student.name, student.gender, student.age]
    );
    parentPort?.postMessage({ success: true });
  } catch (err) {
    parentPort?.postMessage({ success: false, error: (err as Error).message });
  }
});