interface User {
  id: string
  name: string
  email: string
}

export class AuthDTO {
  token: string
  user: User

  constructor(token: string, user: User) {
    const { id, name, email } = user

    this.token = token
    this.user = { id, name, email }
  }
}
