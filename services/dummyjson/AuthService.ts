import { APIRequestContext } from '@playwright/test';

export class AuthService {
  constructor(private request: APIRequestContext) {}

  async login(username: string, password: string) {
    return await this.request.post('/auth/login', {
      data: { username, password },
    });
  }

  async getCurrentUser(token: string) {
    return await this.request.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async refreshToken(refreshToken: string, expiresInMins?: number) {
    return await this.request.post('/auth/refresh', {
      data: {
        refreshToken,
        expiresInMins: expiresInMins || 30,
      },
    });
  }
}
