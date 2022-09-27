interface User {
  id: string
  name: string
  email: string
  created_at: Date
  updated_at: Date
}

export class UserDTO {
  id: string
  name: string
  email: string
  created_at: Date
  updated_at: Date

  constructor(user: User) {
    const { id, name, email, created_at, updated_at } = user

    this.id = id
    this.name = name
    this.email = email
    this.created_at = created_at
    this.updated_at = updated_at
  }
}
