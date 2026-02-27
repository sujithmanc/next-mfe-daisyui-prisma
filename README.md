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
Run these commands in order:

Pull the latest structure: npx prisma db pull

Regenerate the client: npx prisma generate

Restart your Next.js server: This is crucial because Next.js sometimes caches the old Prisma client in development.

---

Key Highlights:
Server Side Deletion: We used a <form> for the delete button. This is the standard way to trigger a "POST" (the server action) from a Server Component without needing onClick or useState.

Navigation: View and Edit use standard Link components to maintain SEO and speed benefits.

DaisyUI Tooltips: Added tooltip classes so users see "View", "Edit", or "Delete" when hovering over the icon buttons.

revalidatePath: This ensures that after you delete an employee, the table immediately updates to show the latest list from the database.
