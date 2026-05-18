exports.up = (pgm) => {
  pgm.createTable('companies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    location: {
      type: 'TEXT',
      notNull: true,
      default: 'Unknown',
    },
    description: {
      type: 'TEXT',
      notNull: true,
      default: '-',
    },
  });

  pgm.createTable('categories', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.createTable('jobs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    company_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'companies(id)',
      onDelete: 'CASCADE',
    },
    category_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'categories(id)',
      onDelete: 'CASCADE',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('jobs');
  pgm.dropTable('categories');
  pgm.dropTable('companies');
};
