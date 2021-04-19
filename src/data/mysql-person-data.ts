import mysql, { Connection } from 'mysql';
import PersonData, { Person } from './person-data';

interface MySQLPersonRow {
  id: string;
  first_name: string;
  last_name: string;
}

let CONNECTION: Connection;

export default class MySQLPersonData implements PersonData {
  async getConnection(): Promise<Connection> {
    if (CONNECTION) {
      return CONNECTION;
    }
    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB
    });
    CONNECTION = conn;
    return conn;
  }

  formatRow(row: MySQLPersonRow): Person {
    return {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name
    };
  }

  async getById(id: string): Promise<Person | undefined> {
    const conn = await this.getConnection();

    return new Promise((resolve, reject) => {
      conn.query(`SELECT id, first_name, last_name FROM person where id = '${id}';`, (e, results) => {
        if (e) {
          reject(e);
        }

        const personRows = results as MySQLPersonRow[];

        resolve(personRows.length ? this.formatRow(personRows[0]) : undefined);
      });
    });
  }

  async searchByName(name: string): Promise<Person[]> {
    const conn = await this.getConnection();

    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT id, first_name, last_name FROM person where concat(first_name, ' ', last_name) like '%${name}%';`,
        (e, results) => {
          if (e) {
            reject(e);
          }

          const personRows = results as MySQLPersonRow[];

          resolve(personRows.map(row => this.formatRow(row)));
        }
      );
    });
  }
}
