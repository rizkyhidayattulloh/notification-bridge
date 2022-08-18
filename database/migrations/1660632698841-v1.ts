import { MigrationInterface, QueryRunner } from "typeorm";

export class v11660632698841 implements MigrationInterface {
    name = 'v11660632698841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE now(), \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_5e568e001f9d1b91f67815c580\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification_logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE now(), \`data\` varchar(255) NOT NULL, \`send_at\` timestamp NULL, \`notification_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE now(), \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE now(), \`domain\` varchar(255) NOT NULL, \`note\` varchar(255) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE now(), \`identifier\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`project_id\` int NULL, UNIQUE INDEX \`IDX_e7ba86a36bfe94d0bb62358b1e\` (\`identifier\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notification_logs\` ADD CONSTRAINT \`FK_c2ebd7cc75091c58fc810a2e31b\` FOREIGN KEY (\`notification_id\`) REFERENCES \`notifications\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_bd55b203eb9f92b0c8390380010\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_95464140d7dc04d7efb0afd6be0\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_95464140d7dc04d7efb0afd6be0\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_bd55b203eb9f92b0c8390380010\``);
        await queryRunner.query(`ALTER TABLE \`notification_logs\` DROP FOREIGN KEY \`FK_c2ebd7cc75091c58fc810a2e31b\``);
        await queryRunner.query(`DROP INDEX \`IDX_e7ba86a36bfe94d0bb62358b1e\` ON \`notifications\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`notification_logs\``);
        await queryRunner.query(`DROP INDEX \`IDX_5e568e001f9d1b91f67815c580\` ON \`admin\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
    }

}
