import { DB_CONNECTION } from "../../envs";
import Database from "../Database";

export default class PostgreAdapter implements Database {
  _connection: any;

  constructor() {
    this._connection = DB_CONNECTION;
  }

  async query(query: string, params: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  close(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
