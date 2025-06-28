-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `appointments` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`patient_id` int(11) NOT NULL,
	`doctor_id` int(11) NOT NULL,
	`appointment_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`status` varchar(32) DEFAULT '''scheduled''',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `doctors` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`specialty` varchar(100) DEFAULT 'NULL',
	`email` varchar(255) DEFAULT 'NULL',
	`phone` varchar(20) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `doctors_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`patient_id` int(11) NOT NULL,
	`appointment_id` int(11) DEFAULT 'NULL',
	`amount` int(11) NOT NULL,
	`status` varchar(32) DEFAULT '''unpaid''',
	`issued_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`due_at` timestamp NOT NULL DEFAULT '''0000-00-00 00:00:00''',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `medical_records` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`patient_id` int(11) NOT NULL,
	`record_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`description` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `patients` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`email` varchar(255) DEFAULT 'NULL',
	`phone` varchar(20) DEFAULT 'NULL',
	`date_of_birth` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `patients_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `prescriptions` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`appointment_id` int(11) NOT NULL,
	`medication` text NOT NULL,
	`dosage` text NOT NULL,
	`instructions` text DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`age` int(11) DEFAULT 'NULL',
	`username` varchar(32) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;
*/