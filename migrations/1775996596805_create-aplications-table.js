exports.up = (pgm) => {
  pgm.createTable('applications', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    user_id: {
      type: 'integer',
      references: 'users',
      onDelete: 'cascade',
    },
    status: {
      type: 'varchar(20)',
      notNull: true,
      default: 'pending',
      check: "status IN ('pending', 'accepted', 'rejected')",
    },
    job_id: {
      type: 'integer',
      references: 'jobs',
      onDelete: 'cascade',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('applications');
};
