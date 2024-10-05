interface RegisterUserProps {
  username: string
  email: string
  password: string
}

export async function registerUser({ username, email, password }: RegisterUserProps) {
  const response = await fetch('http://localhost:3333/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password
    }),
  })

  const data = await response.json()

  return data
}
