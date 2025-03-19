var express = require('express');
var router = express.Router();
const jwt = require("../lib/jwt")
const { chackout_form } = require("../lib/iyzco")
const { find_by_id, create_db, find_one, findByIdAndUpdate } = require("../lib/db_search")
const nodemailer = require("../lib/nodemailler")
const { odeme_yapildiginde } = require("../lib/shopier")

async function odeme_save_db(user_id, data, baseURL, user_ip) {
    try {
        // GİRİŞ YAPILMADAN ÖDEME ALMA
        const data_odeme = {
            name: data.name,
            surname: data.surname,
            phone_number: data.phone_number,
            email: data.email,
            check_eft_number: data.check_eft_number,
            identityNumber: data.identityNumber,
            country: data.country,
            city: data.city,
            zipCode: data.zipCode,
            registrationAddress: data.registrationAddress,
            sozlesmeMesafeSatıs: data.sozlesmeMesafeSatıs,
            product_item: data.product_item,
            user_ip: data.user_ip || user_ip || null
        }
        const check = data_odeme.email
        if (check === undefined) {
            const finish = { user_id: null, success: false }
            return finish
        }
        const new_odeme_data = await create_db(data_odeme, "Odeme")
        const new_odeme_data_id = new_odeme_data
        if (user_id === null) {
            const check_email_data = data.email
            const check_email = await find_one({ email: check_email_data }, "Users")
            // KULLANICI KAYITLI 
            if (check_email !== null) {
                const user_id = check_email._id
                const update_data = { created_by_user: user_id }
                await findByIdAndUpdate(new_odeme_data_id, update_data, "Odeme")
                const finish = { user_id: user_id, success: true, odeme_id: new_odeme_data_id }
                return finish
            }
            // KULLANICI KAYITLI DEĞİL
            if (check_email === null) {
                const new_users_data = {
                    email: data.email,
                    first_name: data.name,
                    last_name: data.surname,
                    phone_number: data.phone_number,
                }
                var new_user = await create_db(new_users_data, "Users_Odeme")
                const new_user_id = new_user._id
                const update_data = { created_by_user: new_user_id }
                await findByIdAndUpdate(new_odeme_data_id, update_data, "Odeme")
                const user_id = new_user._id
                const new_token_data = {
                    user_id
                }
                const first_name = data.name
                const access_token = jwt.jwt_sign_access(new_token_data)
                nodemailer.nodmail(first_name, access_token, baseURL)
                const finish = { user_id: new_user, success: true, odeme_id: new_odeme_data_id }
                return finish
            }
        }
        // GİRİŞ YAPILIP ÖDEME ALMA
        if (user_id !== null) {
            const update_data = { created_by_user: user_id }
            await findByIdAndUpdate(new_odeme_data_id, update_data, "Odeme")
            const finish = { user_id: user_id, success: true, odeme_id: new_odeme_data_id }
            return finish
        }
    } catch (error) {
        if (error) {
            console.log(error, "sepet js 75")
            const finish = { user_id: null, success: false }
            return finish
        }
    }

}
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
            console.log(error, "sepet js 100")
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
            console.log(error, "sepet js 148")
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
            console.log(error, "sepet js 185")
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
        if (Number(product_mik) <= Number(product_data.stockQuantity)) {
            const new_data_array = new Array()
            const jwt_data = await jwt.jwt_verify_access(localStorage_data)
            const find_data = jwt_data.user
            let new_data = find_data.find(data => data.product_id === product_id)

            for (let index = 0; index < find_data.length; index++) {
                if (new_data.product_id !== find_data[index].product_id) {
                    new_data_array.push(find_data[index])
                }
                if (new_data.product_id === find_data[index].product_id) {
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
        } else if (Number(product_mik) > Number(product_data.stockQuantity)) res.json({ success: false })
    } catch (error) {
        console.log(error, "sepet js 224")
        if (error) res.json({ success: false })
    }
})

async function stok_change_alım(product_id_array, user_id) {
    await odeme_yapildiginde(product_id_array,user_id)
}

router.post("/iyzco", async (req, res) => {
    try {
        const axios_data_array = req.body.data.target_input_array
        const db_data = {
            email: (axios_data_array[0].element_value),
            name: axios_data_array[1].element_value,
            surname: axios_data_array[2].element_value,
            phone_number: axios_data_array[3].element_value,
            identityNumber: axios_data_array[4].element_value,
            country: axios_data_array[5].element_value,
            city: axios_data_array[6].element_value,
            zipCode: axios_data_array[7].element_value,
            registrationAddress: axios_data_array[8].element_value,
            sozlesmeMesafeSatıs: axios_data_array[9].element_checked_value,
            check_eft_number: axios_data_array[10].check_eft_number,
            user_ip: axios_data_array[12].ip_data,
            product_item: axios_data_array[11].add_product_item
        }
        const user_data_cookie = req.headers.authorization
        // TOKEN VARSA
        if (user_data_cookie) {
            const token = user_data_cookie.split("Bearer ")[1]
            const user_data = jwt.jwt_verify_access(token)

            const token_user_id = user_data.id
            const baseURL = req.headers.origin
            const user_ip = db_data.user_ip

            const odeme_db_kayıt = await odeme_save_db(token_user_id, db_data, baseURL, user_ip)
            const user_id = odeme_db_kayıt.user_id
            const odeme_id = odeme_db_kayıt.odeme_id

            const product_item = axios_data_array[11].add_product_item
            const new_basketitem_array_data = new Array()
            let price_top = 0
            for (let index = 0; index < product_item.length; index++) {
                const product_id = product_item[index].product_id;
                const product_miktar = Number(product_item[index].product_miktar)
                const product_data = await find_by_id(product_id, "ProductSepet")
                const data = {
                    id: `BI${product_id}`,
                    name: `${product_data.title}`,
                    category1: `${product_data.categories[0].id}`,
                    price: `${product_data.price_data.discountedPrice * product_miktar}`,
                    itemType: "PHYSICAL"
                }
                new_basketitem_array_data.push(data)
                price_top += (Number(new_basketitem_array_data[index].price))
            }

            const data_iyzco = {
                user_id: user_id,
                price: price_top,
                name: db_data.name,
                surname: db_data.surname,
                gsmNumber: String(db_data.phone_number),
                email: db_data.email,
                identityNumber: db_data.identityNumber,
                registrationAddress: db_data.registrationAddress,
                ip: db_data.user_ip,
                city: db_data.city,   // ÖRN İSTANBUL
                country: db_data.country,// ÖRN TÜRKİYE
                zipCode: db_data.zipCode,
                basketItems: new_basketitem_array_data
            }
            chackout_form(data_iyzco).then((async value => {
                res.json({ success: true, data: value })
                const update_data = {
                    iyzco_data: value
                }
                const check = await findByIdAndUpdate(odeme_id, update_data, "Odeme")
                if (check === true) {
                    const product_id_array = axios_data_array[11].add_product_item
                    await stok_change_alım(product_id_array,token_user_id)
                }
            }))
        }
    } catch (error) {
        if (error) {
            console.log(error, "sepet js 306")
            res.json({ success: false })
        }
    }
})
router.post("/eft", async (req, res) => {
    const axios_data_array = req.body.data.target_input_array
    const db_data = {
        email: (axios_data_array[0].element_value),
        name: axios_data_array[1].element_value,
        surname: axios_data_array[2].element_value,
        phone_number: axios_data_array[3].element_value,
        identityNumber: axios_data_array[4].element_value,
        country: axios_data_array[5].element_value,
        city: axios_data_array[6].element_value,
        zipCode: axios_data_array[7].element_value,
        registrationAddress: axios_data_array[8].element_value,
        sozlesmeMesafeSatıs: axios_data_array[9].element_checked_value,
        check_eft_number: axios_data_array[10].check_eft_number,
        user_ip: axios_data_array[12].ip_data,
        product_item: axios_data_array[11].add_product_item
    }
    const user_data_cookie = req.headers.cookie
    const user_data = jwt.jwt_verify_access(user_data_cookie)
    const user_data_id = user_data.id
    const baseURL = req.headers.origin
    const check_db_kayit = await odeme_save_db(user_data_id, db_data, baseURL)
    if (check_db_kayit.success === true) {
        res.json({ success: true })
        const product_id_array = axios_data_array[11].add_product_item
        await stok_change_alım(product_id_array,user_data_id)

    }
    if (check_db_kayit.success === false) res.json({ success: false })
})




router.post("/iyzcoCallBack", (req, res) => {
    res.redirect("/")
})
router.get('/', async (req, res) => {
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