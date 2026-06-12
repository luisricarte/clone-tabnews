const { query } = require("infra/database");

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;
  const connections = await getHowMuchConnections(databaseName);

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

const getHowMuchConnections = async (databaseName) => {
  const valor = await query(
    {text: "SELECT count(*)::int as qtd from pg_stat_activity WHERE datname = $1",
      values: [databaseName]
    }
  ); 
  return Number(valor?.rows[0].qtd) || '';
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
