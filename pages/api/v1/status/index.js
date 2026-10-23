import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const maxConnections = await database.query("SHOW max_connections;");
  const databaseVersion = await database.query("SHOW server_version;");
  const databaseName = process.env.POSTGRES_DB; // Get the database name from environment

  // Log the database name for debugging
  const connectionCount = await database.query({
    text: `SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;`,
    values: [databaseName],
  });

  const databaseOpenedConnectionsResult = connectionCount.rows[0].count;

  const dbMaxConnectionsValues = maxConnections.rows[0].max_connections;
  const databaseValue = databaseVersion.rows[0].server_version;

  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version: databaseValue,
        max_connections: parseInt(dbMaxConnectionsValues),
        opened_connections: parseInt(databaseOpenedConnectionsResult),
        // Assuming used connections are the same as opened connections
      },
    },

    max_connections: maxConnections.rows[0].max_connections,
    connection_count: connectionCount.rows[0].count,
  });
}

export default status;
