export async function checkAuthUser(token: string) {
  const response = await fetch(`http://localhost:3333/auth/checkAuthUser`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  const data = await response.json()

  return data.userData
}