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
<<<<<<< Updated upstream
        all:`${this.urlBase}/order/`,
        setState:`${this.urlBase}/order/`
=======
        all:"https://api.watasoft.com/order/",
        setState:"https://api.watasoft.com/order/"
>>>>>>> Stashed changes
    }


    public urlsToUsers ={
<<<<<<< Updated upstream
        getUsers:`${this.urlBase}/auth/users`,
        getRoles:`${this.urlBase}/auth/roles/WORKER`,
        modUserDetail:`${this.urlBase}/auth/users/updetail`
=======
        getUsers:`https://api.watasoft.com/users`,
        getRoles:`https://api.watasoft.com/roles/WORKER`
>>>>>>> Stashed changes
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
}