import { basePlacements } from '@popperjs/core'

export class Urls {

    private urlBase: string = "http://api.watasoft.com"
    public urlsToLogin = {
        signIn: this.urlBase + "/auth/signin",
        signUp: this.urlBase + "/auth/signup",
        forget: this.urlBase + "/users/forget",
        validate: this.urlBase + "/users/validate",
        restore: this.urlBase + "/users/restore",
    }
    public urlOrders = {
        all:"http://api.watasoft.com/order",
        setState:"http://api.watasoft.com/order"
    }


    public urlsToUsers ={
        getUsers:`http://localhost:5004/users`,
        getRoles:`http://localhost:5004/roles/WORKER`
    }
}