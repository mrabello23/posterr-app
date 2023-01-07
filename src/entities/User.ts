export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  userpass: string;
  createdAt: string;
};

export default class Test {
  private _id: string;
  private _name: string;
  private _email: string;
  private _username: string;
  private _userpass: string;
  private _created_at: string;

  constructor(data: User) {
    const { id, name, email, username, userpass, createdAt } = data;

    this._id = id;
    this._name = name;
    this._email = email;
    this._username = username;
    this._userpass = userpass;
    this._created_at = createdAt;
  }

  getId() {
    return this._id;
  }
  getName() {
    return this._name;
  }
  getEmail() {
    return this._email;
  }
  getUsername() {
    return this._username;
  }
  getUserpass() {
    return this._userpass;
  }
  getCreatedAt() {
    return this._created_at;
  }
}
