interface tokenType {
  token: string;
}

export const setToken = (token: tokenType) => {
  localStorage.setItem("Authorization", token.token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("Authorization");
};
