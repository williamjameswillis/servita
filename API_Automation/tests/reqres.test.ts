import { testUser } from "../support/dataObjects";
import { apiClient, total_users, users_per_page } from "../support/helpers";
import { UserModel } from "../support/dataModels";

describe("positive tests", () => {
  it("POST a user and validate the response", async () => {
    const response = await apiClient.post("users", testUser);
    expect(response.status).toBe(201);

    console.log(response.data);

    expect(response.data.name).toBe(testUser.name);
    expect(response.data.role).toBe(testUser.role);
    expect(response.data).toMatchObject<UserModel>(testUser);
  });

  // test updated at

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

    console.log(response.data);

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

describe("negative tests", () => {
  it("try to GET user that does not exist", async () => {
    const response = await apiClient.get(`users/87264397692376498276`);
    expect(response.status).toBe(404);
  });

  it("try to GET user with invalid ID", async () => {
    const response = await apiClient.get(`users/invalid-id`);
    expect(response.status).toBe(404);
  });
});
