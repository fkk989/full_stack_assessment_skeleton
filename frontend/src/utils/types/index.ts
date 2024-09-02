export interface User {
  username: string;
  email: string;
}

export interface House {
  street_address: string;
  state: string;
  zip: string;
  sqft: number;
  beds: number;
  baths: number;
  list_price: number;
}

export interface HouseUser {
  username: string;
  isChecked: boolean;
}

export interface UpdateHouseUsers {
  users: HouseUser[];
  street_address: string;
}
