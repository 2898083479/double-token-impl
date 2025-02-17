import { create } from "zustand"

interface tokenStore {
    token: string
    refreshToken: string
}

interface tokenStoreActions {
    setToken: (token: string) => void
    setRefreshToken: (refreshToken: string) => void
}

export const useTokenStore = create<tokenStore & tokenStoreActions>((set) => ({
    token: "",
    refreshToken: "",
    setToken: (token: string) => set({ token }),
    setRefreshToken: (refreshToken: string) => set({ refreshToken })
}))