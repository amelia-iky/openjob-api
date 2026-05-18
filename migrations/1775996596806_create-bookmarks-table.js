exports.up = (pgm) => {
  pgm.createTable('bookmarks', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    user_id: {
      type: 'integer',
      references: 'users',
      onDelete: 'cascade',
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
  pgm.dropTable('bookmarks');
};
