export class Urls {

    private urlBase: string = "http://localhost:5004/api"//"https://4941fb63fb26.ngrok.io/api"
    public urlsToLogin = {
        signIn: this.urlBase + "/auth/signin",
        signUp: this.urlBase + "/auth/signup",
        forget: this.urlBase + "/auth/forget"
    }
}