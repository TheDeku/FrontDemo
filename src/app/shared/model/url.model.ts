
export class Urls {

    private urlBase: string = "https://api.watasoft.com"
    private urlBaseTest: string = "http://localhost:5021"
    public urlsToLogin = {
        signIn: this.urlBase + "/auth/signin",
        signUp: this.urlBase + "/auth/signup",
        forget: this.urlBase + "/auth/users/forget",
        validate: this.urlBase + "/auth/users/validate",
        restore: this.urlBase + "/auth/users/restore",
        toGoogle: this.urlBase + "/auth",
    }
    public urlOrders = {
        all:`${this.urlBase}/order/`,
        setState:`${this.urlBase}/order/`,
        byUser:`${this.urlBase}/order/stateUser`,
        byTable:`${this.urlBase}/order/stateTable`
    }
    public urlHistorical = {
        getDataServiceHistorical:`${this.urlBase}/historical/chartValues`,
        getDataServiceHistoricalAdmin:`${this.urlBase}/historical/chartAdmin`,
    }


    public urlsToUsers ={
        getUsers:`${this.urlBase}/auth/users`,
        deleteUser:`${this.urlBase}/auth/users/`,
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
    public urlToPay=`http://localhost:5006/pay`;//`${this.urlBase}/vendor/pay`;

    public urlToNotify=`${this.urlBase}/notifications/testnotification/`;

    public urlsToProducts = {
        getCategories:`${this.urlBase}/product/category`,
        newCat:`${this.urlBase}/product/category`,
        newSubCat:`${this.urlBase}/product/subcategory`,
        newProd:`${this.urlBase}/product`,
        delProd:`${this.urlBase}/product/`,
        updProd:`${this.urlBase}/product/`,

    }
    public urlsToRecipe = {
        getRecipe:`${this.urlBase}/recipe/`,
        NewRecipe:`${this.urlBase}/recipe/`,
    }

    public urlToRequeriment = {
        new:`${this.urlBase}/requeriments/new`,
        update:`${this.urlBase}/requeriments/update`,
        states:`${this.urlBase}/requeriments/states`,
        getById:`${this.urlBase}/requeriments/`,
        getByIdAndType:`${this.urlBase}/requeriments/findByType`,
        getAll:`${this.urlBase}/requeriments`
    };
    public deviceUrl = `${this.urlBase}/notifications`
}