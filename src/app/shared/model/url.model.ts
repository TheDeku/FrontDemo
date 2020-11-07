export class Urls {

    private urlBase: string = "http://api.watasoft.com"
    public urlsToLogin = {
        signIn: this.urlBase + "/auth/signin",
        signUp: this.urlBase + "/auth/signup",
        forget: this.urlBase + "/auth/forget"
    }
}