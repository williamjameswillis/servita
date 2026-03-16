import { faker } from "@faker-js/faker";

export function createCheckOutInformation() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postCode: faker.location.zipCode(),
  };
}
