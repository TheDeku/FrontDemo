import { basePlacements } from '@popperjs/core'

export class Urls {

    private urlBase: string = "https://api.watasoft.com"
    public urlsToLogin = {
        signIn: this.urlBase + "/auth/signin",
        signUp: this.urlBase + "/auth/signup",
        forget: this.urlBase + "/users/forget",
        validate: this.urlBase + "/users/validate",
        restore: this.urlBase + "/users/restore",
    }
    public urlOrders = {
        all:"http://localhost:5008",
        setState:"http://localhost:5008/"
    }


    public urlsToUsers ={
        getUsers:`${this.urlBase}/auth/users`,
        getRoles:`${this.urlBase}/auth/roles/WORKER`,
        modUserDetail:`${this.urlBase}/auth/users/updetail`
    }
}