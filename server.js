import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { sequelize } from "./models/index.js";
import { seedDefaultAdmin } from "./utils/seedAdmin.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

try {
  await sequelize.authenticate();
  console.log("Database connected");

  await sequelize.sync({ alter: true });
  console.log("Database synced");

  await seedDefaultAdmin();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("Server failed:", error.message);
  process.exit(1);
}
