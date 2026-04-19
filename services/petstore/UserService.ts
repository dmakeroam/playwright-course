import { APIRequestContext } from '@playwright/test';

export class UserService {
  constructor(private request: APIRequestContext) {}

  async createUser(user: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }) {
    return await this.request.post('/v2/user', { data: user });
  }

  async getUserByUsername(username: string) {
    return await this.request.get(`/v2/user/${username}`);
  }

  async updateUser(username: string, data: object) {
    return await this.request.put(`/v2/user/${username}`, { data });
  }

  async deleteUser(username: string) {
    return await this.request.delete(`/v2/user/${username}`);
  }

  async loginUser(username: string, password: string) {
    return await this.request.get(
      `/v2/user/login?username=${username}&password=${password}`
    );
  }
}
