export type User = {
  id: number,
  name: string,
  phone: string,
  username: string,
  website: string,
  email: string,
  address: {
    city: string
    street: string
    suite: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  company: {
    bs: string
    catchPhrase: string
    name: string
  }
}

export type UserBody = {
  name: string,
  phone: string,
  email: string,
}
