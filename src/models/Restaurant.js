import db from "../config/database.js";

class Restaurant {
  static tableName = "restaurants";

  static createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cuisine TEXT,
        link TEXT,
        rating REAL,
        price_range TEXT,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    db.exec(sql);
    console.log(`✅ Table '${this.tableName}' created/verified`);
  }

  static findAll() {
    const stmt = db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id`);
    return stmt.all();
  }

  static findById(id) {
    const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`);
    return stmt.get(id);
  }

  static create(data) {
    const { name, cuisine, link, rating, price_range, notes } = data;

    const stmt = db.prepare(`
      INSERT INTO ${this.tableName} (name, cuisine, link, rating, price_range, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name,
      cuisine || null,
      link || null,
      rating ?? null,
      price_range || null,
      notes || null
    );

    return this.findById(result.lastInsertRowid);
  }

  static update(id, data) {
    const { name, cuisine, link, rating, price_range, notes } = data;

    const updates = [];
    const values = [];

    if (name !== undefined) {
      updates.push("name = ?");
      values.push(name);
    }
    if (cuisine !== undefined) {
      updates.push("cuisine = ?");
      values.push(cuisine);
    }
    if (link !== undefined) {
      updates.push("link = ?");
      values.push(link);
    }
    if (rating !== undefined) {
      updates.push("rating = ?");
      values.push(rating);
    }
    if (price_range !== undefined) {
      updates.push("price_range = ?");
      values.push(price_range);
    }
    if (notes !== undefined) {
      updates.push("notes = ?");
      values.push(notes);
    }

    updates.push("updated_at = CURRENT_TIMESTAMP");

    if (updates.length === 1) {
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

  static delete(id) {
    const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`);
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static count() {
    const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`);
    return stmt.get().count;
  }

  static seed() {
    const count = this.count();
    if (count === 0) {
      console.log("📝 Seeding Paris restaurants table...");

      const sampleRestaurants = [
        {
          name: "Candelaria",
          cuisine: "Mexican",
          link: "https://maps.app.goo.gl/23yeR9WHcCeJ6ygZ6",
          rating: 4.3,
          price_range: "$$",
          notes:
            "Excellent vibe with a speak-easy on the interior, however a little on the pricey side",
        },
        {
          name: "Bánh mì 13 Avenue d'ivry",
          cuisine: "Vietnamese",
          link: "https://maps.app.goo.gl/mp9BzMLLzPNobovT7",
          rating: 4.5,
          price_range: "$",
          notes:
            "A hole-in-the-wall with excellent banh mi at 5e, a weekly visit",
        },
        {
          name: "Le Café du Commerce",
          cuisine: "French",
          link: "https://maps.app.goo.gl/iWqRKUBaDzmjXfMu6",
          rating: 4.4,
          price_range: "$$",
          notes: "Splendid place with even more splendid confit de canard",
        },
        {
          name: "Stellar by Ephemera",
          cuisine: "Modern Mix",
          link: "https://maps.app.goo.gl/sJRMcgxr7mrZNHFz8",
          rating: 4.8,
          price_range: "$$",
          notes:
            "Very cool interior design, you feel like you're lost in a far away galaxy",
        },
      ];

      sampleRestaurants.forEach((r) => this.create(r));
      console.log(`✅ Seeded ${sampleRestaurants.length} restaurants`);
    }
  }
}

export default Restaurant;
