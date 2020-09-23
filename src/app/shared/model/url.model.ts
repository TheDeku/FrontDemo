export class Urls {

    private urlBase: string = "https://71c20fffc66e.ngrok.io/api"
    public urlsToLogin = {
        signIn: this.urlBase + "/auth/signin",
        signUp: this.urlBase + "/auth/signup",
        forget: this.urlBase + "/users/forget",
        validate: this.urlBase + "/users/validate",
        restore: this.urlBase + "/users/restore",
    }
}