test("GET to /v1/status should returns 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);
  const responseBody = await response.json();

  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  console.log(
    `Parsed Updated At: ${parsedUpdatedAt} === ${responseBody.updated_at}`,
  );

  expect(responseBody.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(parsedUpdatedAt).toBe(responseBody.updated_at);
});
