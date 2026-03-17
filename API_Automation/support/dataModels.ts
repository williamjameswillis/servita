export interface UserModel {
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  data: UserDataModel;
  name?: string;
  role?: string;
  id?: string | number;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  support?: UserSupportModel;
  meta?: UserMetaModel;
}

interface UserDataModel {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

interface UserSupportModel {
  url: string;
  text: string;
}

interface UserMetaModel {
  powered_by: string;
  docs_url: string;
  upgrade_url: string;
  example_url: string;
  variant: string;
  message: string;
  cta: UserCTAModel;
  context: string;
}

interface UserCTAModel {
  label: string;
  url: string;
}

export interface RegistrationModel {
  email: string;
  password: string;
}
