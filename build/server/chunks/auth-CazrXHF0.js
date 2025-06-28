import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase, encodeBase64url } from '@oslojs/encoding';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { mysqlTable, datetime, varchar, int, timestamp, text } from 'drizzle-orm/mysql-core';
import { d as private_env } from './index-CCyR2w2-.js';

const user = mysqlTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  age: int("age"),
  username: varchar("username", { length: 32 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull()
});
const session = mysqlTable("session", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => user.id),
  expiresAt: datetime("expires_at").notNull()
});
const patients = mysqlTable("patients", {
  id: int("id").primaryKey().autoincrement(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).unique(),
  phone: varchar("phone", { length: 20 }),
  dateOfBirth: timestamp("date_of_birth"),
  createdAt: timestamp("created_at").defaultNow()
});
const appointments = mysqlTable("appointments", {
  id: int("id").primaryKey().autoincrement(),
  patientId: int("patient_id").notNull().references(() => patients.id, { onDelete: "cascade" }),
  doctorId: int("doctor_id").notNull().references(() => doctors.id, { onDelete: "cascade" }),
  appointmentDate: timestamp("appointment_date").notNull(),
  status: varchar("status", { length: 32 }).default("scheduled"),
  // e.g., scheduled, completed, cancelled
  createdAt: timestamp("created_at").defaultNow()
});
const doctors = mysqlTable("doctors", {
  id: int("id").primaryKey().autoincrement(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  specialty: varchar("specialty", { length: 100 }),
  email: varchar("email", { length: 255 }).unique(),
  phone: varchar("phone", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow()
});
const prescriptions = mysqlTable("prescriptions", {
  id: int("id").primaryKey().autoincrement(),
  appointmentId: int("appointment_id").notNull().references(() => appointments.id, { onDelete: "cascade" }),
  medication: text("medication").notNull(),
  dosage: text("dosage").notNull(),
  instructions: text("instructions"),
  createdAt: timestamp("created_at").defaultNow()
});
const medicalRecords = mysqlTable("medical_records", {
  id: int("id").primaryKey().autoincrement(),
  patientId: int("patient_id").notNull().references(() => patients.id, { onDelete: "cascade" }),
  recordDate: timestamp("record_date").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
const invoices = mysqlTable("invoices", {
  id: int("id").primaryKey().autoincrement(),
  patientId: int("patient_id").notNull().references(() => patients.id, { onDelete: "cascade" }),
  appointmentId: int("appointment_id").references(() => appointments.id, { onDelete: "set null" }),
  amount: int("amount").notNull(),
  status: varchar("status", { length: 32 }).default("unpaid"),
  // e.g., unpaid, paid, cancelled
  issuedAt: timestamp("issued_at").defaultNow(),
  dueAt: timestamp("due_at"),
  createdAt: timestamp("created_at").defaultNow()
});
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appointments,
  doctors,
  invoices,
  medicalRecords,
  patients,
  prescriptions,
  session,
  user
}, Symbol.toStringTag, { value: "Module" }));
if (!private_env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const client = mysql.createPool(private_env.DATABASE_URL);
const db = drizzle(client, { schema, mode: "default" });
const DAY_IN_MS = 1e3 * 60 * 60 * 24;
const sessionCookieName = "auth-session";
function generateSessionToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  const token = encodeBase64url(bytes);
  return token;
}
async function createSession(token, userId) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session$1 = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
  };
  await db.insert(session).values(session$1);
  return session$1;
}
async function validateSessionToken(token) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const [result] = await db.select({
    // Adjust user table here to tweak returned data
    user: { id: user.id, username: user.username },
    session
  }).from(session).innerJoin(user, eq(session.userId, user.id)).where(eq(session.id, sessionId));
  if (!result) {
    return { session: null, user: null };
  }
  const { session: session$1, user: user$1 } = result;
  const sessionExpired = Date.now() >= session$1.expiresAt.getTime();
  if (sessionExpired) {
    await db.delete(session).where(eq(session.id, session$1.id));
    return { session: null, user: null };
  }
  const renewSession = Date.now() >= session$1.expiresAt.getTime() - DAY_IN_MS * 15;
  if (renewSession) {
    session$1.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
    await db.update(session).set({ expiresAt: session$1.expiresAt }).where(eq(session.id, session$1.id));
  }
  return { session: session$1, user: user$1 };
}
async function invalidateSession(sessionId) {
  await db.delete(session).where(eq(session.id, sessionId));
}
function setSessionTokenCookie(event, token, expiresAt) {
  event.cookies.set(sessionCookieName, token, {
    expires: expiresAt,
    path: "/"
  });
}
function deleteSessionTokenCookie(event) {
  event.cookies.delete(sessionCookieName, {
    path: "/"
  });
}

export { setSessionTokenCookie as a, db as b, createSession as c, deleteSessionTokenCookie as d, generateSessionToken as g, invalidateSession as i, sessionCookieName as s, user as u, validateSessionToken as v };
//# sourceMappingURL=auth-CazrXHF0.js.map
