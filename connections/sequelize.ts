import { Sequelize } from "sequelize";
import { User } from "models/user";
import { Order } from "models/orders";
import { Auth } from "models/auth";

// Configura la conexión a la base de datos
export const sequelize = new Sequelize(
  "postgresql://postgres.kvleenckljzlfqymqxhq:ye9Aymt9mykOUsKd@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
);

// postgresql://postgres.kvleenckljzlfqymqxhq:ye9Aymt9mykOUsKd@aws-0-us-east-1.pooler.supabase.com:6543/postgres
async function syncDb() {
  try {
    // Sincroniza todos los modelos con la base de datos
    await sequelize.sync({ alter: true }); // Usar { force: true } eliminará todas las tablas antes de crear nuevas
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

syncDb();

// async function dropAllTables() {
//   try {
//     // Obtén la interfaz de consulta
//     const queryInterface = sequelize.getQueryInterface();

//     // Obtén todos los nombres de las tablas
//     const tables = await queryInterface.showAllTables();

//     // Elimina cada tabla con la opción CASCADE
//     for (const table of tables) {
//       await queryInterface.dropTable(table, { cascade: true });
//       console.log(`Table ${table} has been dropped`);
//     }
//   } catch (error) {
//     console.error("Error dropping tables:", error);
//   } finally {
//     // Cierra la conexión después de eliminar las tablas
//     await sequelize.close();
//     process.exit(0); // Salir del proceso después de la sincronización
//   }
// }

// dropAllTables();
