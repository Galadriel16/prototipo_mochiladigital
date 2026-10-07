import type { AuthService, User } from './auth.types';
// TODO: sustituir por adaptador institucional. No usa credenciales ni SSO.
const mockUser: User = { id: 'demo-001', name: 'Alex Mora', role: 'Estudiante · Perfil ficticio', institution: 'Centro educativo de demostración' };
let signedIn = true;
export const mockAuthService: AuthService & { enterDemo(): Promise<void> } = {
  async getCurrentUser() { return signedIn ? mockUser : null; },
  async signOut() { signedIn = false; },
  async enterDemo() { signedIn = true; },
};
