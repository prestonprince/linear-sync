import { betterAuth } from "better-auth";
import { db } from "./db.js";

export const auth = betterAuth({
  database: {
    db: db,
    type: "postgres",
    casing: "snake",
  },
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:3000"],
});
