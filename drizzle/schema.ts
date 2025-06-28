import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, timestamp, varchar, unique, text, foreignKey, datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const appointments = mysqlTable("appointments", {
	id: int().autoincrement().notNull(),
	patientId: int("patient_id").notNull(),
	doctorId: int("doctor_id").notNull(),
	appointmentDate: timestamp("appointment_date", { mode: 'string' }).default('current_timestamp()').notNull(),
	status: varchar({ length: 32 }).default('\'scheduled\''),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const doctors = mysqlTable("doctors", {
	id: int().autoincrement().notNull(),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	specialty: varchar({ length: 100 }).default('NULL'),
	email: varchar({ length: 255 }).default('NULL'),
	phone: varchar({ length: 20 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => [
	unique("doctors_email_unique").on(table.email),
]);

export const invoices = mysqlTable("invoices", {
	id: int().autoincrement().notNull(),
	patientId: int("patient_id").notNull(),
	appointmentId: int("appointment_id").default('NULL'),
	amount: int().notNull(),
	status: varchar({ length: 32 }).default('\'unpaid\''),
	issuedAt: timestamp("issued_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	dueAt: timestamp("due_at", { mode: 'string' }).default('''0000-00-00 00:00:00''').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const medicalRecords = mysqlTable("medical_records", {
	id: int().autoincrement().notNull(),
	patientId: int("patient_id").notNull(),
	recordDate: timestamp("record_date", { mode: 'string' }).default('current_timestamp()').notNull(),
	description: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const patients = mysqlTable("patients", {
	id: int().autoincrement().notNull(),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	email: varchar({ length: 255 }).default('NULL'),
	phone: varchar({ length: 20 }).default('NULL'),
	dateOfBirth: timestamp("date_of_birth", { mode: 'string' }).default('current_timestamp()').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => [
	unique("patients_email_unique").on(table.email),
]);

export const prescriptions = mysqlTable("prescriptions", {
	id: int().autoincrement().notNull(),
	appointmentId: int("appointment_id").notNull(),
	medication: text().notNull(),
	dosage: text().notNull(),
	instructions: text().default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const session = mysqlTable("session", {
	id: varchar({ length: 255 }).notNull(),
	userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id),
	expiresAt: datetime("expires_at", { mode: 'string'}).notNull(),
});

export const user = mysqlTable("user", {
	id: varchar({ length: 255 }).notNull(),
	age: int().default('NULL'),
	username: varchar({ length: 32 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
},
(table) => [
	unique("user_username_unique").on(table.username),
]);
