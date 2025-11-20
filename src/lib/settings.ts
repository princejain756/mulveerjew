import { query } from './db';

export interface GoldRateSetting {
  id: number;
  rate_22k: number | null;
  rate_18k: number | null;
  silver_rate: number | null;
  updated_at: Date;
}

async function ensureGoldRatesTableExists(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS gold_rates (
      id INT PRIMARY KEY,
      price_per_gram_inr DECIMAL(10,2) NOT NULL DEFAULT 0,
      purity_label VARCHAR(50) NOT NULL DEFAULT '22K',
      rate_20k DECIMAL(10,2) DEFAULT NULL,
      rate_22k DECIMAL(10,2) DEFAULT NULL,
      rate_24k DECIMAL(10,2) DEFAULT NULL,
      rate_18k DECIMAL(10,2) DEFAULT NULL,
      silver_rate DECIMAL(10,2) DEFAULT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await ensureColumnExists('rate_18k', 'DECIMAL(10,2) DEFAULT NULL');
  await ensureColumnExists('silver_rate', 'DECIMAL(10,2) DEFAULT NULL');
}

async function ensureColumnExists(
  column: string,
  definition: string,
): Promise<void> {
  const rows = await query(
    `SELECT COUNT(*) AS count
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'gold_rates'
       AND COLUMN_NAME = ?`,
    [column],
  );

  const count = Number(rows?.[0]?.count ?? 0);
  if (count === 0) {
    await query(`ALTER TABLE gold_rates ADD COLUMN ${column} ${definition}`);
  }
}

export async function getGoldRate(): Promise<GoldRateSetting | null> {
  await ensureGoldRatesTableExists();
  try {
    const rows = await query(
      'SELECT id, rate_22k, rate_18k, silver_rate, updated_at FROM gold_rates WHERE id = 1',
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    const row = rows[0] as any;

    return {
      id: row.id,
      rate_22k:
        row.rate_22k !== null && row.rate_22k !== undefined
          ? Number(row.rate_22k)
          : null,
      rate_18k:
        row.rate_18k !== null && row.rate_18k !== undefined
          ? Number(row.rate_18k)
          : null,
      silver_rate:
        row.silver_rate !== null && row.silver_rate !== undefined
          ? Number(row.silver_rate)
          : null,
      updated_at: row.updated_at,
    };
  } catch (error: any) {
    if (error && error.code === 'ER_NO_SUCH_TABLE') {
      await ensureGoldRatesTableExists();
      return null;
    }
    throw error;
  }
}

export async function upsertGoldRate(
  rate22k: number | null,
  rate18k: number | null,
  silverRate: number | null,
): Promise<void> {
  await ensureGoldRatesTableExists();
  try {
    const pricePerGram = rate22k ?? rate18k ?? silverRate ?? 0;

    await query(
      `
        INSERT INTO gold_rates (id, price_per_gram_inr, rate_22k, rate_18k, silver_rate)
        VALUES (1, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          price_per_gram_inr = VALUES(price_per_gram_inr),
          rate_22k = VALUES(rate_22k),
          rate_18k = VALUES(rate_18k),
          silver_rate = VALUES(silver_rate),
          updated_at = CURRENT_TIMESTAMP
      `,
      [pricePerGram, rate22k, rate18k, silverRate],
    );
  } catch (error: any) {
    if (error && error.code === 'ER_NO_SUCH_TABLE') {
      await ensureGoldRatesTableExists();
      const pricePerGram = rate22k ?? rate18k ?? silverRate ?? 0;
      await query(
        `
          INSERT INTO gold_rates (id, price_per_gram_inr, rate_22k, rate_18k, silver_rate)
          VALUES (1, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            price_per_gram_inr = VALUES(price_per_gram_inr),
            rate_22k = VALUES(rate_22k),
            rate_18k = VALUES(rate_18k),
            silver_rate = VALUES(silver_rate),
            updated_at = CURRENT_TIMESTAMP
        `,
        [pricePerGram, rate22k, rate18k, silverRate],
      );
      return;
    }
    throw error;
  }
}
