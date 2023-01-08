import pgp from "pg-promise";

import { DB_CONNECTION } from "../../envs";
import Database from "../Database";

export default class PostgreAdapter implements Database {
  private _connection: any;

  constructor() {
    // connection automatically closes after 5 minutos of idle
    const idleTimeoutMillis = 300000;

    this._connection = pgp()({
      idleTimeoutMillis,
      allowExitOnIdle: true,
      connectionString: DB_CONNECTION,
    });
  }

  async query(statement: string, params: any): Promise<any> {
    return this._connection.query(statement, params);
  }

  async close(): Promise<any> {
    return this._connection.$pool.end();
  }
}
