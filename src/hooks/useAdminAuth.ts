const ADMIN_KEY = "bk_admin_session";
const ADMIN_PASSWORD = "BK_ADMIN_2026";

export const useAdminAuth = () => {
  const isAuthenticated = () => localStorage.getItem(ADMIN_KEY) === "true";

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_KEY, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_KEY);
  };

  return { isAuthenticated, login, logout };
};
