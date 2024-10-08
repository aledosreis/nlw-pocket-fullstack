interface AuthenticateUserProps {
  username: string
  password: string
}

export async function authenticateUser({ username, password }: AuthenticateUserProps) {
  const response = await fetch('http://localhost:3333/signIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    }),
  })

  const data = await response.json()

  return data
}
