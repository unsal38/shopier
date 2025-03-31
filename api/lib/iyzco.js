const axios = require('axios');
var Iyzipay = require('iyzipay');
var QRCode = require('qrcode');
const { IYZCO_API_KEY, IYZCO_SECRET_KEY, IYZCO_BASE_URL } = require("../config");
var CryptoJS = require("crypto-js");
let { find_by_id, create_db, find_one, findByIdAndUpdate, find_by_id_end_delete } = require("../lib/db_search");
var iyzipay = new Iyzipay({
    apiKey: IYZCO_API_KEY,
    secretKey: IYZCO_SECRET_KEY,
    uri: IYZCO_BASE_URL
});
const baseURL = "https://www.tarzisahane.com/"
//const baseURL = "http://localhost:3000/"
var callbackUrl = `${baseURL}/sepet/iyzcoCallBack` // ÖDEME SONRASI YÖNLENDİRİLEN ADRES
var enabledInstallments = [1, 2, 3, 6, 9]       // TAKSİT BİLGİSİ
var itemType = Iyzipay.BASKET_ITEM_TYPE.PHYSICAL // FİZİKSEL ÜRÜN
var iyzco_komisyon1 = (5 / 100) // %4,25
var iyzco_komisyon2 = 1 // 0,25

function chackout_form(request_data) {
    const promise_data = new Promise((resolve, reject) => {

        const data = request_data
        // console.log(data)
        const basketItems = data.basketItems

        //////////****** */  basketItems//*********** */

        // id: 'BI101', // BI ÜRÜN İD  BI2312312312312313
        // name: 'Binocular',
        // category1: 'Collectibles',
        // price: '0.3'  // HESAPLAMA GEREKİYOR VERGİ VS VS İÇİN

        //////////****** */  ÜRÜN GENEL BİLGİLERİ//*********** */

        const user_id = data.user_id
        const price = Number(data.price)

        const gun_date = Date.now()
        const conversationId = `${user_id}conversationId${gun_date}` // KULLANICI ADI VE GÜN BİLGİSİ "JO123123123123123"
        const paid_price_add = (Number(price) * iyzco_komisyon1) + iyzco_komisyon2// iyzco komisyon oranı
        const paidPrice = Number(price) + paid_price_add
        const basketId = `${user_id}BSİD${gun_date}`  // KULLANICI İD BSİD GÜN BİLGİSİ "231231231231BSİD23131231312"

        //////////****** */  BUYER BİLGİLERİ//*********** */


        const name = data.name
        const surname = data.surname
        const gsmNumber = String(data.gsmNumber)
        const email = data.email

        const identityNumber = data.identityNumber
        const registrationAddress = data.registrationAddress
        const ip = data.ip
        const city = data.city      // ÖRN İSTANBUL
        const country = data.country // ÖRN TÜRKİYE
        const zipCode = data.zipCode

        const id = `BY${gun_date}` // BY GÜN BİLGİSİ ŞEKLİNDE "BY31231231224321"

        //////////****** */  ADRES//*********** */
        const contactName = `${name} ${surname}`
        // const city = city
        // const country = country
        const address = registrationAddress
        // const zipCode: '34742'



        var request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId,
            price,
            paidPrice,
            currency: Iyzipay.CURRENCY.TRY,
            basketId,
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            callbackUrl, // STANDART
            enabledInstallments, // STANDART
            buyer: {
                id,
                name,
                surname,
                gsmNumber,
                email,
                identityNumber,
                // lastLoginDate: '2015-10-05 12:43:35',
                // registrationDate: '2013-04-21 15:12:09',
                registrationAddress,
                ip,
                city,
                country,
                zipCode
            },
            shippingAddress: {
                contactName,
                city,
                country,
                address,
                zipCode
            },
            billingAddress: {
                contactName,
                city,
                country,
                address,
                zipCode
            },
            basketItems
        };
        // console.log(request)
        iyzipay.checkoutFormInitialize.create(request,
            function (err, result) {
                //const callbackUrl = result.paymentPageUrl //.payWithIyzicoPageUrl
                //console.log(result, "iyzco js lib");
                resolve(result);
            }
        )

    });
    return promise_data
}

var apiKey = IYZCO_API_KEY
var secretKey = IYZCO_SECRET_KEY;

//Generate authorization string
function generateAuthorizationString(data_iyzico) {

    // Benzersiz bir randomKey ortaya çıkaralım
    // Örnek randomKey : 1722246017090123456789
    var randomKey = new Date().getTime() + "123456789";

    // İstek için uri_path değişkenini yerleştirelim.
    // Örnek uri_path : /payment/bin/check
    //uri_path = "/iyzilink/products";
    var uri_path = "/v2/iyzilink/products";

    // payload'u alalım ve uri path ile randomKey'i birleştirelim.
    // Örnek payload : payload: 1722246017090123456789/payment/bin/check{"binNumber":"589004"}
    if (data_iyzico) { var payload = randomKey + uri_path + data_iyzico } else { var payload = randomKey + uri_path }
    // HMACSHA256 kullanarak payload'u şifreleyelim.
    // Örnek encryptedData : 91e491486d3aa951b4f387cc93d67fc754c4729af95344b694435f56447819e9
    var encryptedData = (CryptoJS.HmacSHA256(payload, secretKey)).toString() // CryptoJS.HmacSHA256(payload, secretKey);
    // encryptedData değişkenini kullanarak authorizationString oluşturalım.
    /* Örnek authorizationString : apiKey:sandbox-3uHv0LccjcWDyFHTvJpiACKPcJwbczmZ&
                                        randomKey:1722246017090123456789&
                                        signature:91e491486d3aa951b4f387cc93d67fc754c4729af95344b694435f56447819e9 */
    var authorizationString = "apiKey:" + apiKey
        + "&randomKey:" + randomKey
        + "&signature:" + encryptedData;
    // base64 kullanarak authorizationString'i şifreleyelim.
    // Örnek base64EncodedAuthorization : YXBpS2V5OnNhbmRib3gtM3VIdjBMY2NqY1dEeUZIVHZKcGlBQ0tQY0p3YmN6bVomcmFuZG9tS2V5OjE3MjIyNDYwMTcwOTAxMjM0NTY3ODkmc2lnbmF0dXJlOjkxZTQ5MTQ4NmQzYWE5NTFiNGYzODdjYzkzZDY3ZmM3NTRjNDcyOWFmOTUzNDRiNjk0NDM1ZjU2NDQ3ODE5ZTk=
    const base64EncodedAuthorization_1 = CryptoJS.enc.Utf8.parse(authorizationString)
    var base64EncodedAuthorization = CryptoJS.enc.Base64.stringify(base64EncodedAuthorization_1);
    // authorizationStrin'i  'IYZWSv2 ' string'ine ekleyelim.
    // Örnek return value : IYZWSv2 YXBpS2V5OnNhbmRib3gtM3VIdjBMY2NqY1dEeUZIVHZKcGlBQ0tQY0p3YmN6bVomcmFuZG9tS2V5OjE3MjIyNDYwMTcwOTAxMjM0NTY3ODkmc2lnbmF0dXJlOjkxZTQ5MTQ4NmQzYWE5NTFiNGYzODdjYzkzZDY3ZmM3NTRjNDcyOWFmOTUzNDRiNjk0NDM1ZjU2NDQ3ODE5ZTk=
    return "IYZWSv2 " + base64EncodedAuthorization;
}
//Generate authorization string

async function iyzzlinkDelete(product_id) {
    const product_data = await find_by_id(product_id, "ProductSepet")
    const token = (product_data.iyzco_data[0].token)
    const data = {
        token
    }
    const req_data = JSON.stringify(data)
    var authorization = generateAuthorizationString(req_data);
    const axios_config = {
        data: { token },
        headers: {
            "Content-Type": 'application/json',
            "Authorization": authorization,
            "x-iyzi-rnd": "123456789"
        },
    }
    const url = "https://sandbox-api.iyzipay.com/v2/iyzilink/products"
    await axios.delete(url, axios_config)
        .then(res => console.log(res))
        .catch(err => console.log(err, "iyzco err"))
}
async function iyzlink(request_data) {
    const product_id = request_data
    const product_Data = await find_by_id(product_id, "ProductSepet")

    const post_url = "https://sandbox-api.iyzipay.com/v2/iyzilink/products"
    var name = product_Data.title
    //iyzico komistyon ekleme/////
    //////////////////
    const price_shopier = product_Data.price_data.discountedPrice
    var price = Number(price_shopier) + (iyzco_komisyon1 * Number(price_shopier)) + iyzco_komisyon2
    //iyzico komistyon ekleme/////
    var currencyCode = "TRY" // ÜRÜN PARA BİRİMİ
    var description = product_Data.describe // açıklama
    //base64 link/////
    //////////////////
    const image_data = product_Data.media[0].url
    var encodedImageFile = await axios
        .get(`${image_data}`, { responseType: 'arraybuffer' })
        .then(res => {
            let base64Image = Buffer.from(res.data).toString('base64')
            return base64Image
        })
    //base64 link/////
    //////////////////
    const axios_data = {
        name,
        price,
        currencyCode,
        description,
        encodedImageFile
    }

    const req_data = JSON.stringify(axios_data)
    //////////////////
    //////////////Authorization ////////
    ///////////////////////////////////

    var authorization = generateAuthorizationString(req_data);

    //////////////Authorization ////////
    ///////////////////////////////////

    const axios_config = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": authorization,
            "x-iyzi-rnd": "123456789"
        }
    }
    await axios.post(post_url, axios_data, axios_config)
        .then(async res => {
            const data_check = res.data
            if (data_check.status === "success") {
                const qrdata = data_check.data.url
                QRCode.toDataURL(qrdata, async function (err, url_data) {
                    if (err) console.log(err, "qrcode js")
                    const data_update = {
                        iyzco_data: {
                            token: data_check.data.token,
                            url: data_check.data.url,
                            imageUrl: data_check.data.imageUrl,
                            QRCode: url_data
                        }
                    }
                    await findByIdAndUpdate(request_data, data_update, "Product")
                })
            }
        })
        .catch(err => console.log(err, "iyzco err"))
}
async function iyzlinkliste() {
    var authorization = generateAuthorizationString();

    const axios_config = {
        data: {
            page: 1,
            count: 10
        },
        headers: {
            "Content-Type": 'application/json',
            "Authorization": authorization,
            "x-iyzi-rnd": "123456789"
        },
    }

    const url = "https://sandbox-api.iyzipay.com/v2/iyzilink/products"
    await axios.get(url, axios_config)
        .then(res => console.log(res))
        .catch(err => console.log(err.data, "iyzco err"))

}
module.exports = {
    iyzzlinkDelete,
    chackout_form,
    iyzlink,
    iyzlinkliste,
}