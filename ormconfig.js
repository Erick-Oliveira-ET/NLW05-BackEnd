module.exports = {
  type: "sqlite",
  database: "./src/database/database.sqlite",
  migrations: ["./src/database/migrations/**.ts"],
  entities: [__dirname + "/src/entities/**.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
