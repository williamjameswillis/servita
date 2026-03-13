import { testUser } from "./dataObjects";
import { apiClient } from "./helpers";
import { UserModel } from "./dataModels";

describe("positive tests", () => {
  it("POST a user", async () => {
    const response = await apiClient.post("users", testUser);
    expect(response.status).toBe(201);

    expect(response.data).toMatchObject<UserModel>(testUser);
  });

  it("GET users", async () => {
    const response = await apiClient.get(`users/2`);
    expect(response.status).toBe(200);
  });
});

describe("negative tests", () => {
  // it("POST a user", async () => {
  //   const response = await apiClient.post("users", {});
  //   expect(response.status).toBe(500);
  // });

  it("try to GET user that does not exist", async () => {
    const response = await apiClient.get(`users/87264397692376498276`);
    expect(response.status).toBe(404);
  });

  it("try to GET user with invalid ID", async () => {
    const response = await apiClient.get(`users/invalid-id`);
    expect(response.status).toBe(404);
  });
});
