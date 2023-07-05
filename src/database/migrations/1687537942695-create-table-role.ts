import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableRole1687537942695 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: 'tb_role',
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment"
                        },
                        {
                            name: 'name',
                            isUnique: true,
                            type: 'varchar'
                        },
                        {
                            type: 'timestamp',
                            name: 'createdAt',
                            default: 'now()'
                        },
                        {
                            name: "updatedAt",
                            type: "timestamp",
                            default: "now()",
                        },
                        {
                            type: 'timestamp',
                            name: 'deletedAt',
                            isNullable: true
                        },
                    ]
                })
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_role', true)
    }
}
