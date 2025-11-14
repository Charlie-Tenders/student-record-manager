import db from "../config/database.js";

// Define the User model
class User {
  // Table schema definition
  static tableName = "users";

  // Create the users table
  static createTable() {
    const sql = `
			CREATE TABLE IF NOT EXISTS ${this.tableName} (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				email TEXT UNIQUE,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		`;
    db.exec(sql);
    console.log(`✅ Table '${this.tableName}' created/verified`);
  }

  // Get all users
  static findAll() {
    const stmt = db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id`);
    return stmt.all();
  }

  // Find user by ID
  static findById(id) {
    const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`);
    return stmt.get(id);
  }

  // Find user by email
  static findByEmail(email) {
    const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE email = ?`);
    return stmt.get(email);
  }

  // Create new user
  static create(userData) {
    const { name, email } = userData;
    const stmt = db.prepare(`
			INSERT INTO ${this.tableName} (name, email) 
			VALUES (?, ?)
		`);
    const result = stmt.run(name, email || null);
    return this.findById(result.lastInsertRowid);
  }

  // Update user
  static update(id, userData) {
    const { name, email } = userData;

    // Build dynamic update query based on provided fields
    const updates = [];
    const values = [];

    if (name !== undefined) {
      updates.push("name = ?");
      values.push(name);
    }

    if (email !== undefined) {
      updates.push("email = ?");
      values.push(email);
    }

    // Always update the updated_at timestamp
    updates.push("updated_at = CURRENT_TIMESTAMP");

    if (updates.length === 1) {
      // Only timestamp update, nothing to change
      return this.findById(id);
    }

    values.push(id);

    const stmt = db.prepare(`
			UPDATE ${this.tableName} 
			SET ${updates.join(", ")} 
			WHERE id = ?
		`);

    stmt.run(...values);
    return this.findById(id);
  }

  // Delete user
  static delete(id) {
    const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`);
    const result = stmt.run(id);
    return result.changes > 0;
  }

  // Check if email exists (excluding a specific user ID)
  static emailExists(email, excludeId = null) {
    let stmt;
    if (excludeId) {
      stmt = db.prepare(
        `SELECT id FROM ${this.tableName} WHERE email = ? AND id != ?`
      );
      return stmt.get(email, excludeId) !== undefined;
    } else {
      stmt = db.prepare(`SELECT id FROM ${this.tableName} WHERE email = ?`);
      return stmt.get(email) !== undefined;
    }
  }

  // Count total users
  static count() {
    const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`);
    return stmt.get().count;
  }

  // Seed sample data
  static seed() {
    const count = this.count();

    if (count === 0) {
      console.log("📝 Seeding users table...");

      const sampleUsers = [
        { name: "Alice", email: "alice@example.com" },
        { name: "Bob", email: "bob@example.com" },
        { name: "Charlie", email: "charlie@example.com" },
        { name: "Dave", email: "dave@example.com" },
      ];

      sampleUsers.forEach((user) => this.create(user));
      console.log(`✅ Seeded ${sampleUsers.length} users`);
    }
  }
}

export default User;
