
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
        all:`${this.urlBase}/order/`,
        setState:`${this.urlBase}/order/`,
        byUser:`${this.urlBase}/order/stateUser`,
        byTable:`${this.urlBase}/order/stateTable`
    }


    public urlsToUsers ={
        getUsers:`${this.urlBase}/auth/users`,
        getRoles:`${this.urlBase}/auth/roles/WORKER`,
        modUserDetail:`${this.urlBase}/auth/users/updetail`,
        userByMail:`${this.urlBase}/auth/users/byMail`
    }
    public urlsToWarehouse ={
        getCategories:`${this.urlBase}/ingredient/categories`,
        getUnits:`${this.urlBase}/ingredient/units`,
        getIngredients:`${this.urlBase}/ingredient`,
        createUnits:`${this.urlBase}/ingredient/unit`,
        createCategory:`${this.urlBase}/ingredient/category`,
        findByCategory:`${this.urlBase}/ingredient/bycategory`,
        createIngredient:`${this.urlBase}/ingredient`,
        createIngredientDetail:`${this.urlBase}/ingredient/detail`,
    }
    public urlToTable=`${this.urlBase}/table`;
    public urlToPay=`${this.urlBase}/payment/pay`;

    public urlToRequeriment = {
        new:`${this.urlBase}/requeriments/new`,
        update:`${this.urlBase}/requeriments/update`,
        states:`${this.urlBase}/requeriments/states`,
        getById:`${this.urlBase}/requeriments/`,
        getByIdAndType:`${this.urlBase}/requeriments/findByType`,
        getAll:`${this.urlBase}/requeriments`
    };
    public deviceUrl = "https://restaurapp-pushnotify-utils.herokuapp.com/"
}