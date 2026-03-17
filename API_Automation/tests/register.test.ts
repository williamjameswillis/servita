import { registrationDetails } from "../support/dataObjects";
import { apiClient } from "../support/helpers";

describe("Happy Path tests - ", () => {
  it("POST a registration and validate the response", async () => {
    const response = await apiClient.post("register", registrationDetails);

    expect(response.status).toBe(200);
    expect(response.data.id).toBeDefined();
    expect(typeof response.data.id).toBe("number");
    expect(response.data.token).toBeDefined();
    expect(typeof response.data.token).toBe("string");
  });
});

describe("Sad Path tests - ", () => {
  it("try to register with a POST with invalid data", async () => {
    const response = await apiClient.post("register", { invalid: "data" });

    expect(response.status).toBe(400);
  });

  it("try to register with a POST with no password", async () => {
    const response = await apiClient.post("register", {
      email: registrationDetails.email,
    });

    expect(response.status).toBe(400);
  });

  it("try to register with a POST with no email", async () => {
    const response = await apiClient.post("register", {
      password: registrationDetails.password,
    });

    expect(response.status).toBe(400);
  });
});
