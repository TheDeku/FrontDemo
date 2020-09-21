export class Urls {

    private urlBase: string = "https://70eed08a0f2c.ngrok.io/api"
    public urlsToLogin = {
        signIn: this.urlBase + "/auth/signin",
        signUp: this.urlBase + "/auth/signup",
        forget: this.urlBase + "/auth/forget"
    }
}