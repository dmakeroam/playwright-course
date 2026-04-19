import { APIRequestContext } from '@playwright/test';

export class PetService {
  constructor(private request: APIRequestContext) {}

  async addPet(pet: {
    id: number;
    name: string;
    status: string;
    category?: object;
  }) {
    return await this.request.post('/v2/pet', {
      data: {
        id: pet.id,
        name: pet.name,
        category: pet.category || { id: 1, name: 'Dogs' },
        photoUrls: ['https://example.com/photo.jpg'],
        status: pet.status,
      },
    });
  }

  async getPetById(petId: number) {
    return await this.request.get(`/v2/pet/${petId}`);
  }

  async updatePet(pet: object) {
    return await this.request.put('/v2/pet', { data: pet });
  }

  async findByStatus(status: 'available' | 'pending' | 'sold') {
    return await this.request.get(
      `/v2/pet/findByStatus?status=${status}`
    );
  }

  async deletePet(petId: number) {
    return await this.request.delete(`/v2/pet/${petId}`);
  }
}
