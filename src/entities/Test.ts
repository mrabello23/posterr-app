export default class Test {
  _id: number;
  _type: string;

  constructor(id: number, type: string) {
    this._id = id;
    this._type = type;
  }

  getId() {
    return this._id;
  }

  getType() {
    return this._type;
  }
}
