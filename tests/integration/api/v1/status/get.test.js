require("dotenv").config();

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  console.log(await responseBody);

  expect(response.status).toBe(200);
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  expect(responseBody.dependencies.database.version.slice(0, 15)).toBe(
    "PostgreSQL 16.0",
  );
});
