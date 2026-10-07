export interface User { id: string; name: string; role: string; institution: string; }
export interface AuthService { getCurrentUser(): Promise<User | null>; signOut(): Promise<void>; }
