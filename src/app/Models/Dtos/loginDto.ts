import { User } from "../user";

export interface LoginDto
{
    token: string;
    user: User
}