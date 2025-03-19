const axios = require('axios');
var Iyzipay = require('iyzipay');
const { IYZCO_API_KEY, IYZCO_SECRET_KEY, IYZCO_BASE_URL } = require("../config");
var iyzipay = new Iyzipay({
    apiKey: IYZCO_API_KEY,
    secretKey: IYZCO_SECRET_KEY,
    uri: IYZCO_BASE_URL
});
const baseURL = document.location.origin
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

/// SONRA DENECEK OLAN KODLAR

module.exports = {
    chackout_form,
}