import { test, expect } from '@playwright/test';
import { PetService } from '../../services/petstore/PetService';

test.describe('Pet Store - Pet API', () => {
  let petService: PetService;
  const testPetId = 99887;

  test.beforeEach(async ({ request }) => {
    petService = new PetService(request);
  });

  test('Create a new pet', async () => {
    const response = await petService.addPet({
      id: testPetId,
      name: 'Buddy',
      status: 'available',
      category: { id: 1, name: 'Dogs' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Buddy');
    expect(body.status).toBe('available');
  });

  test('Get pet by ID', async () => {
    const response = await petService.getPetById(testPetId);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(testPetId);
  });

  test('Find pets by status', async () => {
    const response = await petService.findByStatus('available');
    expect(response.status()).toBe(200);
    const pets = await response.json();
    expect(Array.isArray(pets)).toBe(true);
    expect(pets.length).toBeGreaterThan(0);
  });

  test('Delete a pet', async () => {
    const response = await petService.deletePet(testPetId);
    expect(response.status()).toBe(200);
  });
});
