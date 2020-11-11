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
        all:"https://api.watasoft.com/order",
        setState:"https://api.watasoft.com/order"
    }


    public urlsToUsers ={
        getUsers:`${this.urlBase}/auth/users`,
        getRoles:`${this.urlBase}/auth/roles/WORKER`,
        modUserDetail:`${this.urlBase}/auth/users/updetail`
    }
}