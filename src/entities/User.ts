export type UserEntity = {
  id: string;
  name: string;
  email: string;
  username: string;
  created_at: string;
};

export default class User {
  private id: string;
  private name: string;
  private email: string;
  private username: string;
  private createdAt: string;
  createdAtFormatted = "";

  constructor(data: UserEntity) {
    const { id, name, email, username, created_at } = data;

    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.createdAt = created_at;
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getUsername() {
    return this.username;
  }
  getCreatedAt() {
    return this.createdAt;
  }
}
