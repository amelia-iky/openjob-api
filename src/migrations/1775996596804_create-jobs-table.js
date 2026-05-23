/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('jobs', {
    id: {
      type: 'varchar(13)',
      primaryKey: true,
    },
    company_id: {
      type: 'varchar(13)',
      notNull: true,
      references: 'companies(id)',
      onDelete: 'CASCADE',
    },
    category_id: {
      type: 'varchar(13)',
      notNull: true,
      references: 'categories(id)',
      onDelete: 'CASCADE',
    },
    title: {
      type: 'varchar(100)',
      notNull: true,
    },
    description: {
      type: 'text',
      notNull: true,
    },
    job_type: {
      type: 'varchar(20)',
      notNull: true,
      check: "job_type IN ('full-time', 'part-time', 'contract', 'internship')",
    },
    experience_level: {
      type: 'varchar(20)',
      notNull: true,
      check: "experience_level IN ('entry', 'mid', 'senior')",
    },
    location_type: {
      type: 'varchar(20)',
      notNull: true,
      check: "location_type IN ('remote', 'onsite', 'hybrid')",
    },
    location_city: {
      type: 'varchar(100)',
      notNull: false,
    },
    salary_min: {
      type: 'numeric(12,2)',
      notNull: false,
    },
    salary_max: {
      type: 'numeric(12,2)',
      notNull: false,
    },
    is_salary_visible: {
      type: 'boolean',
      notNull: false,
      default: false,
    },
    status: {
      type: 'varchar(20)',
      notNull: true,
      default: 'open',
      check: "status IN ('open', 'closed')",
    },
    created_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('jobs');
};
