#!/bin/bash
docker compose exec -itu 0 letalk-api npx prisma migrate dev;
docker compose exec -itu 0 letalk-api npx prisma db seed;
