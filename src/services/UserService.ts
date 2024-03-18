import { IUser } from "../models/User/IUser";

export class UserService {
    private static user: IUser = JSON.parse(localStorage.getItem("user") || "{}");

    public static setUser(newUser: IUser): void {
        localStorage.setItem("user", JSON.stringify(newUser))
        this.user = newUser;
    }

    public static getUser(): IUser {
        const storedUser: IUser = JSON.parse(localStorage.getItem("user") || "{}");
        this.user = storedUser
        return this.user;
    }
}
