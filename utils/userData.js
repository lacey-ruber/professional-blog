export function genetateUserData() {
  return {
    avatarUrl: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
      .toString(36)
      .substring(7)}.svg`,
  }
}
