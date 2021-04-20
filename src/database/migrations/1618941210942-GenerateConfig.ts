import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class GenerateConfig1618941210942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "settings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "username",
            type: "varchar",
          },
          {
            name: "chat",
            type: "boolean",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "NOW()",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "NOW()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("settings");
  }
}
