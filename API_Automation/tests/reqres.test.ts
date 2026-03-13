import { testUser } from "./dataObjects";
import { apiClient } from "./helpers";
import { UserModel } from "./dataModels";

describe("positive tests", () => {
  it("POST a user and validate the response", async () => {
    const response = await apiClient.post("users", testUser);
    expect(response.status).toBe(201);

    console.log(response.data);

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
