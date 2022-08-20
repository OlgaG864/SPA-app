export interface Login {
  email?: string | null;
  password?: string | null;
}

export interface RegisterUser {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface User {
  token?: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Login {
  email?: string | null;
  password?: string | null;
}

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  isEdit: boolean;
}

export interface AddCustomer {
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  email?: string | null;
}
