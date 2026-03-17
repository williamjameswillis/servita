import { RegistrationModel, UserModel } from "./dataModels";

export const testUser: UserModel = {
  name: "William Willis",
  role: "admin",
  data: {
    id: "123",
    email: "william@test.com",
    first_name: "William",
    last_name: "Willis",
    avatar: "https://example.com/avatar.jpg",
  },
};

export const registrationDetails: RegistrationModel = {
  email: "eve.holt@reqres.in",
  password: "pistol",
};
