const { query } = require("infra/database");

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const connections = await getHowMuchConnections();
  const pg_version = await getVersionOfPostgres();
  const maxConnections = await getMaxConnections();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: pg_version,
        max_connections: parseInt(maxConnections),
        opened_connections: connections,
      },
    },
  });
}

const getHowMuchConnections = async () => {
  const valor = await query(
    "SELECT count(*)::int as qtd from pg_stat_activity WHERE datname = 'postgres' AND state='active'",
  );

  const connectionCount = Number(valor.rows[0].qtd);

  return connectionCount;
};

const getVersionOfPostgres = async () => {
  const version = await query("SELECT version();");

  return version.rows[0].version;
};

const getMaxConnections = async () => {
  const maxConnections = await query("SHOW max_connections;");

  return maxConnections.rows[0].max_connections;
};

export default status;
