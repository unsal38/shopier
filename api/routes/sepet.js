var express = require('express');
var router = express.Router();
const jwt = require("../lib/jwt")
const { chackout_form, chackout_form_retrieve } = require("../lib/iyzco")
const { find_by_id, create_db } = require("../lib/db_search")

router.post("/ekle", async (req, res) => {
    try {
        const product_id = req.body.axios_data.product_id
        const product_data = await find_by_id(product_id, "ProductSepet")
        const token_data = [{
            product_id,
            id: `BI${product_id}`,
            name: product_data.title,
            category1: product_data.categories[0],
            miktar: 1,
            price: product_data.price_data.discountedPrice
        }]
        const token = jwt.jwt_sign_access(token_data)
        res.json({ success: token })
    } catch (error) {
        if (error) {
            console.log(error)
            res.json({ success: false })
        }
    }
})
router.post("/update", async (req, res) => {
    try {
        const add_product_id = req.body.axios_data.product_id
        const localStorage_token = req.body.axios_data.sepet_product_check
        const check_token = jwt.jwt_verify_access(localStorage_token)
        const new_sepet_array = new Array()
        if (check_token === false) res.json({ success: false })
        if (check_token !== false) {
            const localStorage_data = check_token.user

            localStorage_data.forEach(e => {
                if (e.product_id === add_product_id) {
                    const new_data = {
                        product_id: e.product_id,
                        miktar: Number(e.miktar) + 1,
                        id: e.id,
                        name: e.name,
                        category1: e.category1,
                        price: e.price.discountedPrice
                    }
                    new_sepet_array.push(new_data)
                }
                if (e.product_id !== add_product_id) new_sepet_array.push(e)
            });
            const find_element = new_sepet_array.find((element) => element.product_id === add_product_id)

            if (find_element === undefined) {
                const product_data = await find_by_id(add_product_id, "ProductSepet")
                const new_data1 = {
                    product_id: add_product_id,
                    miktar: 1,
                    id: `BI${add_product_id}`,
                    name: product_data.title,
                    category1: product_data.categories[0],
                    price: product_data.price_data.discountedPrice
                }
                new_sepet_array.push(new_data1)
            }
            const new_token = jwt.jwt_sign_access(new_sepet_array)
            res.json({ success: new_token })
        }
    } catch (error) {
        if (error) {
            console.log(error)
            res.json({ success: false })
        }
    }
})
router.post("/product", async (req, res) => {
    const token = req.body.axios_data
    const product_data_user = jwt.jwt_verify_access(token)
    if (product_data_user !== false) {
        const product_data_token = product_data_user.user
        let new_product_data = new Array()
        for (let index = 0; index < product_data_token.length; index++) {
            const element = product_data_token[index].product_id;
            const product_data = await find_by_id(element, "ProductSepet")
            new_product_data.push(product_data)
        }
        res.json({
            success: new_product_data,
            miktar: product_data_token
        })
    }
    if (product_data_user === false) res.json({ success: false })

})
router.post("/delete", (req, res) => {
    try {
        const delete_id = req.body.delete_id
        const axios_data = req.body.axios_data
        const jwt_data = (jwt.jwt_verify_access(axios_data)).user
        const new_jwt_data = new Array()
        jwt_data.forEach(e => {
            if (e.product_id !== delete_id) new_jwt_data.push(e)
        });
        const new_jwt_sepet_data = jwt.jwt_sign_access(new_jwt_data)
        res.json({ success: new_jwt_sepet_data })
    } catch (error) {
        if (error) {
            console.log(error)
            res.json({ success: false })
        }
    }
})
router.post("/miktar", async (req, res) => {
    const product_id = req.body.axios_data.product_id
    const product_mik = req.body.axios_data.miktar
    const localStorage_data = req.body.axios_data.localStorage_data
    try {
        const product_data = await find_by_id(product_id, "ProductSepet")
        if (product_mik > product_data.stockQuantity) res.json({ success: false })
        if (product_mik <= product_data.stockQuantity) {
            const new_data_array = new Array()
            const jwt_data = await jwt.jwt_verify_access(localStorage_data)
            const find_data = jwt_data.user
            let new_data = find_data.find(data => data.product_id === product_id)

            for (let index = 0; index < find_data.length; index++) {
                if (new_data.product_id !== find_data[index].product_id) {
                    new_data_array.push(find_data[index])
                }
                if (new_data.product_id === find_data[index].product_id) {

                    console.log(find_data[index])
                    const new_data = {
                        product_id: find_data[index].product_id,
                        miktar: Number(product_mik),
                        id: find_data[index].id,
                        name: find_data[index].name,
                        category1: find_data[index].category1,
                        price: find_data[index].price
                    }
                    new_data_array.push(new_data)
                }

            }
            const new_jwt = await jwt.jwt_sign_access(new_data_array)
            res.json({ success: new_jwt })
        }
    } catch (error) {
        console.log(error)
        if (error) res.json({ success: false })
    }
})
router.post("/iyzco", async (req, res) => {
    try {
        const user_cookie = req.headers.cookie
        const token = user_cookie.split("Authorization=Bearer ")[1]
        const user_id = (jwt.jwt_verify_access(token)).id
        const user_data = await find_by_id(user_id, "Users")
        const basket_jwt = req.body.axios_data.basket
        const basket = (jwt.jwt_verify_access(basket_jwt)).user

        if(basket !== undefined){
            let price_total = 0
            for (let index = 0; index < basket.length; index++) {
                price_total += (Number(basket[index].price) * Number(basket[index].miktar))
            }
            const data = {
                user_id: user_id,
                name: user_data.first_name,
                price: price_total,
                surname: user_data.last_name,
                gsmNumber: user_data.phone_number,
                email: user_data.email,
                basket
            }
             console.log(data)
            //chackout_form(data)
            // .then((values) => {
            //     res.json({ success: values })
            // })
        }





    } catch (error) {
        console.log(error)
    }














})
router.post("/eft", (req,res)=> {

    console.log(req.body, "eft sepet router")

    res.json({success: true})
   // res.json({success: "message"}) error message email hatalı / kayıt yapılamadı
})

router.get('/',async (req, res) => {
    const permissions = req.permissions;
    const page_params = "sepet";
    res.render('sepet', {
        permissions,
        page_params,
        javascript_file: null,
        javascript_file1: null,
        javascript_file2: null,
        javascript_file3: null,
        javascript_file4: "../javascripts/token.js"
    });
});
module.exports = router;