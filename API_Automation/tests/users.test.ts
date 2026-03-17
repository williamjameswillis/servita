import { testUser } from "../support/dataObjects";
import { apiClient, total_users, users_per_page } from "../support/helpers";
import { UserModel } from "../support/dataModels";

describe("Happy Path tests - ", () => {
  it("POST a user and validate the response", async () => {
    const response = await apiClient.post("users", testUser);

    expect(response.status).toBe(201);
    expect(response.data.name).toBe(testUser.name);
    expect(response.data.role).toBe(testUser.role);
    expect(response.data).toMatchObject<UserModel>(testUser);
    expect(response.data.updatedAt).not.toBeDefined();
  });

  it("PUT a user and validate the response contains todays date in updatedAt", async () => {
    const updatedUser = {
      name: "Bob Smith",
      ...testUser,
    };
    const response = await apiClient.put(`users/2`, updatedUser);

    expect(response.status).toBe(200);
    expect(response.data.updatedAt).toBeDefined();
    expect(response.data.updatedAt).toContain(
      new Date().toISOString().split("T")[0],
    );
  });

  it("DELETE a user and validate the response", async () => {
    const response = await apiClient.delete(`users/2`);

    expect(response.status).toBe(204);
  });

  it("GET a known user and validate the response", async () => {
    const response = await apiClient.get(`users/2`);

    expect(response.status).toBe(200);
    expect(response.data.data).toMatchObject<UserModel["data"]>({
      email: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String),
      id: expect.any(Number),
    });
  });

  it("GET all users from page 2 and validate the response", async () => {
    const pageNumber = 2;
    const response = await apiClient.get(`users/?page=${pageNumber}`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("page", pageNumber);
    expect(response.data).toHaveProperty("per_page", users_per_page);
    expect(response.data).toHaveProperty("total", total_users);
    expect(response.data).toHaveProperty(
      "total_pages",
      Math.ceil(total_users / users_per_page),
    );
    expect(response.data.data).toHaveLength(users_per_page);
  });
});

describe("Sad Path tests - ", () => {
  it("try to GET user that does not exist", async () => {
    const response = await apiClient.get(`users/87264397692376498276`);

    expect(response.status).toBe(404);
  });

  it("try to GET user with invalid ID", async () => {
    const response = await apiClient.get(`users/invalid-id`);

    expect(response.status).toBe(404);
  });
});
