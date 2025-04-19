@echo off
set NODE_ENV=development
set DATABASE_URL=postgresql://portfolio_owner:npg_Xya3gzmiSFO6@ep-aged-silence-a1y59hko-pooler.ap-southeast-1.aws.neon.tech/portfolio?sslmode=require
npx tsx server/index.ts 