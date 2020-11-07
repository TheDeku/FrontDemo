import { basePlacements } from '@popperjs/core'

export class Urls {

    private urlBase: string = "http://api.watasoft.com"
    public urlsToLogin = {
        signIn: this.urlBase + "/auth/signin",
        signUp: this.urlBase + "/auth/signup",
        forget: this.urlBase + "/auth/forget"
    }
    public urlOrders = {
        all:"http://localhost:5008"
    }
}