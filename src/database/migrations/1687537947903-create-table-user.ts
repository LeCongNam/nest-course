import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableUser1687537947903 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tb_user',
                columns: [
                    {
                        name: 'id',
                        isPrimary: true,
                        length: '36',
                        type: 'char',
                    },
                    {
                        type: 'varchar',
                        name: 'userName'
                    },
                    {
                        type: 'varchar',
                        name: 'email',
                        isUnique: true
                    },
                    {
                        type: 'varchar',
                        name: 'password'
                    },
                    {
                        type: 'varchar',
                        isNullable: true,
                        name: 'address'
                    },
                    {
                        type: 'varchar',
                        isNullable: true,
                        name: 'phone'
                    },
                    {
                        type: 'varchar',
                        isNullable: true,
                        name: 'firstName'
                    },
                    {
                        type: 'varchar',
                        isNullable: true,
                        name: 'lastName'
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
                    {
                        name: 'roleId',
                        type: 'int'
                    }

                ]
            })
        )

        await queryRunner.createForeignKey(
            "tb_user",
            new TableForeignKey({
                columnNames: ["roleId"],
                referencedColumnNames: ["id"],
                name: 'user_role',
                referencedTableName: "tb_role",
                onDelete: "CASCADE",
            }),
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tb_user")

        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("roleId") !== -1,
        )
        await queryRunner.dropForeignKey("tb_user", foreignKey)
        await queryRunner.dropColumn("tb_user", 'roleId')
        await queryRunner.dropTable('tb_user', true, true, true)
    }
}
