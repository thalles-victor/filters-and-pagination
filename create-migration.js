// createMigration.js
const fs = require("fs");
const path = require("path");

const migrationsDir = path.join(__dirname, "migrations");

// Gera timestamp no formato YYYYMMDDHHMMSS
function getTimestamp() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");

  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

function createMigration(name) {
  const timestamp = getTimestamp();
  const fileName = `${timestamp}_${name}.sql`;
  const filePath = path.join(migrationsDir, fileName);

  const template = `-- Migration: ${name}\n-- Created at ${new Date().toISOString()}\n\n`;

  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }

  fs.writeFileSync(filePath, template);
  console.log(`Migration created: ${filePath}`);
}

// Exemplo de uso:
// node createMigration.js create_cars_table
const migrationName = process.argv[2];
if (!migrationName) {
  console.error("Use: node createMigration.js <migration_name>");
  process.exit(1);
}

createMigration(migrationName);
