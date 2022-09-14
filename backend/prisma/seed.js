import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const now = new Date().toISOString()
var birthday = new Date(1995, 11, 17).toISOString;


const States = [
  { "id": "226d4f03-f494-4218-9d1a-171cef010451", "name": "MG", "percent": 1, "createdAt": now, birthday },
  { "id": "3e933673-ec3c-48ab-ba3e-76fe561f32fd", "name": "RJ", "percent": 0.9, "createdAt": now, birthday },
  { "id": "8c5c69b6-47da-44e6-bc0e-af16632a8894", "name": "ES", "percent": 1.11, "createdAt": now, birthday },
  { "id": "fa1b2558-f921-459d-a8af-c7a490037dd1", "name": "SP", "percent": 0.8, "createdAt": now, birthday }
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
    .then(() => console.info('[SEED] Sucesso em criar os seeds'))
    .catch(e => console.error('[SEED] Falha em criar os seeds', e))
}

seedStates();
