import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const maxConnections = await database.query("SHOW max_connections;");
  const databaseVersion = await database.query("SHOW server_version;");
  const connectionCount = await database.query(
    "SELECT COUNT(*) FROM pg_stat_activity;",
  );
  const databaseVersionValue = databaseVersion.rows[0].version;
  response.status(200).json({
    updated_at: updateAt,
    dependecies: {
      database: {
        version: databaseVersionValue,
      },
    },

    max_connections: maxConnections.rows[0].max_connections,
    connection_count: connectionCount.rows[0].count,
  });
}

export default status;
