type UserDataResponse = {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

type GetUserDataProps = {
  username: string
}

export async function getUserData({
  username,
}: GetUserDataProps): Promise<UserDataResponse> {
  const response = await fetch(`http://localhost:3333/profile/${username}`)
  const data = await response.json()

  return data.userData
}
