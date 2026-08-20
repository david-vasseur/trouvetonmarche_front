import { create } from 'zustand';

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
}

interface UserState {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));