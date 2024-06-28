export interface JwtPayload {
    id: string; //id firmado por MI BACKEND
    iat?: string; //fecha de creación
    exp?: string; //fecha de expiración
}