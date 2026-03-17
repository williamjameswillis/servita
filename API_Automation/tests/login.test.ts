import { registrationDetails } from "../support/dataObjects";
import { apiClient } from "../support/helpers";

describe("Happy Path tests - ", () => {
  it("POST a login and validate the response", async () => {
    const response = await apiClient.post("login", registrationDetails);

    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
    expect(typeof response.data.token).toBe("string");
  });
});

describe("Sad Path tests - ", () => {
  it("try to login with a POST with invalid data", async () => {
    const response = await apiClient.post("login", { invalid: "data" });

    expect(response.status).toBe(400);
  });

  it("try to login with a POST with no password", async () => {
    const response = await apiClient.post("login", {
      email: registrationDetails.email,
    });

    expect(response.status).toBe(400);
  });

  it("try to login with a POST with no email", async () => {
    const response = await apiClient.post("login", {
      password: registrationDetails.password,
    });

    expect(response.status).toBe(400);
  });
});
