export class Urls {

    private urlBase: string = "https://4941fb63fb26.ngrok.io/api"
    public urlsToLogin = {
        signIn: this.urlBase + "/auth/signin",
        signUp: this.urlBase + "/auth/signup",
        forget: this.urlBase + "/auth/forget"
    }
}