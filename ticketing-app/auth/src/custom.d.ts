export interface ReqUser {
  email: string
  role: string
  id: string
}

declare global {
  namespace Express {
    interface Request {
      user?: ReqUser
    }
  }
}