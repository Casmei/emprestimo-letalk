import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const States = [
  { "id": "226def03-f494-4218-9d1a-171cef010451", "name": "MG", "percent": 1, "createdAt": "2020-07-10 15:00:00.000", "updatedAt": "2020-07-10 15:00:00.000" },
  { "id": "3e935673-ec3c-48ab-ba3e-76fe561f32fd", "name": "RJ", "percent": 0.9, "createdAt": "2020-07-10 15:00:00.000", "updatedAt": "2020-07-10 15:00:00.000" },
  { "id": "8c5ca9b6-47da-44e6-bc0e-af16632a8894", "name": "ES", "percent": 1.11, "createdAt": "2020-07-10 15:00:00.000", "updatedAt": "2020-07-10 15:00:00.000" },
  { "id": "fa1b9558-f921-459d-a8af-c7a490037dd1", "name": "SP", "percent": 0.8, "createdAt": "2020-07-10 15:00:00.000", "updatedAt": "2020-07-10 15:00:00.000" }
]

function seedStates() {
  Promise.all(States.map(n => prisma.state.create({
    data: {
      id: n.id,
      name: n.name,
      percent: n.percent,
      createdAt: n.createdAt,
      updatedAt: n.updatedAt
    }
  })))
    .then(() => console.info('[SEED] Succussfully create coffee records'))
    .catch(e => console.error('[SEED] Failed to create coffee records', e))
}

seedStates();
