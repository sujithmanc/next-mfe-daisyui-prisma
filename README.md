## How to Start the Application

### 1. Install dependencies
```bash
npm install

```

### 2. Setup Environment Variables

Create a `.env.local` file in the root directory and populate it with your keys.

> **Note:** `.env.local` is preferred over plain `.env` for secrets because it is automatically ignored by git if you created your app with `create-next-app`.

### 3. Sync the Database

Push the Prisma schema state to your database. This command updates your local database tables to match the schema defined in your code.

```bash
npx prisma db push

```

### 4. Start the application

```bash
npm run dev

```
