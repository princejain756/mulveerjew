import { query } from './db';

export interface GoldRateSetting {
  id: number;
  rate_20k: number | null;
  rate_22k: number | null;
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
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

export async function getGoldRate(): Promise<GoldRateSetting | null> {
  try {
    const rows = await query(
      'SELECT id, rate_20k, rate_22k, updated_at FROM gold_rates WHERE id = 1',
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    const row = rows[0] as any;

    return {
      id: row.id,
      rate_20k:
        row.rate_20k !== null && row.rate_20k !== undefined
          ? Number(row.rate_20k)
          : null,
      rate_22k:
        row.rate_22k !== null && row.rate_22k !== undefined
          ? Number(row.rate_22k)
          : null,
      updated_at: row.updated_at,
    };
  } catch (error: any) {
    // Handle case where table does not exist yet
    if (error && error.code === 'ER_NO_SUCH_TABLE') {
      await ensureGoldRatesTableExists();
      return null;
    }
    throw error;
  }
}

export async function upsertGoldRate(
  rate20k: number | null,
  rate22k: number | null,
): Promise<void> {
  try {
    // Use rate_22k as price_per_gram_inr, or rate_20k if 22k is not set, or 0 as fallback
    const pricePerGram = rate22k ?? rate20k ?? 0;
    
    // Keep only one row (id = 1) and update both rates
    await query(
      `
        INSERT INTO gold_rates (id, price_per_gram_inr, rate_20k, rate_22k)
        VALUES (1, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          price_per_gram_inr = VALUES(price_per_gram_inr),
          rate_20k = VALUES(rate_20k),
          rate_22k = VALUES(rate_22k),
          updated_at = CURRENT_TIMESTAMP
      `,
      [pricePerGram, rate20k, rate22k],
    );
  } catch (error: any) {
    if (error && error.code === 'ER_NO_SUCH_TABLE') {
      await ensureGoldRatesTableExists();
      const pricePerGram = rate22k ?? rate20k ?? 0;
      await query(
        `
          INSERT INTO gold_rates (id, price_per_gram_inr, rate_20k, rate_22k)
          VALUES (1, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            price_per_gram_inr = VALUES(price_per_gram_inr),
            rate_20k = VALUES(rate_20k),
            rate_22k = VALUES(rate_22k),
            updated_at = CURRENT_TIMESTAMP
        `,
        [pricePerGram, rate20k, rate22k],
      );
      return;
    }
    throw error;
  }
}
