import { mysqlTable, datetime, text, varchar, int, timestamp } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	age: int('age'),
	username: varchar('username', { length: 32 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull()
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export const patients = mysqlTable('patients', {
  id: int('id').primaryKey().autoincrement(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).unique(),
  phone: varchar('phone', { length: 20 }),
  dateOfBirth: timestamp('date_of_birth'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const appointments = mysqlTable('appointments', {
  id: int('id').primaryKey().autoincrement(),
	patientId: int('patient_id').notNull().references(() => patients.id, { onDelete: 'cascade' }),
	doctorId: int('doctor_id').notNull().references(() => doctors.id, { onDelete: 'cascade' }),
	appointmentDate: timestamp('appointment_date').notNull(),
	status: varchar('status', { length: 32 }).default('scheduled'), // e.g., scheduled, completed, cancelled
	createdAt: timestamp('created_at').defaultNow(),
});

export const doctors = mysqlTable('doctors', {
  id: int('id').primaryKey().autoincrement(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  specialty: varchar('specialty', { length: 100 }),
  email: varchar('email', { length: 255 }).unique(),
  phone: varchar('phone', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const prescriptions = mysqlTable('prescriptions', {
  id: int('id').primaryKey().autoincrement(),
  appointmentId: int('appointment_id').notNull().references(() => appointments.id, { onDelete: 'cascade' }),
  medication: text('medication').notNull(),
  dosage: text('dosage').notNull(),
  instructions: text('instructions'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const medicalRecords = mysqlTable('medical_records', {
  id: int('id').primaryKey().autoincrement(),
  patientId: int('patient_id').notNull().references(() => patients.id, { onDelete: 'cascade' }),
  recordDate: timestamp('record_date').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const invoices = mysqlTable('invoices', {
  id: int('id').primaryKey().autoincrement(),
  patientId: int('patient_id').notNull().references(() => patients.id, { onDelete: 'cascade' }),
  appointmentId: int('appointment_id').references(() => appointments.id, { onDelete: 'set null' }),
	amount: int('amount').notNull(),
	status: varchar('status', { length: 32 }).default('unpaid'), // e.g., unpaid, paid, cancelled
	issuedAt: timestamp('issued_at').defaultNow(),
	dueAt: timestamp('due_at'),
	createdAt: timestamp('created_at').defaultNow(),
});
