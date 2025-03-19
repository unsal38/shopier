
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function alert(message) {
    $(".alert")
        .children(".text")
        .remove()
    $("#alert")
        .removeClass("d-none")
    $("#alert .alert")
        .append(`<p class="m-0 p-0 text-capitalize">${message}</p>`);
}
function on_click_alert() {
    $("#alert").addClass("d-none")
    document.location.reload()
}
var baseURL = document.location.origin
var token = getCookie("Authorization")
const token_data = `Bearer ${token.split("Bearer ")[1]}`
var axios_config = {
    baseURL,
    headers: { 'Authorization': token_data }
}
$(() => {
    $("#kategori-ekle").on("click", () => {
        axios.get("panel/categoriesAdd")
            .then(res => {
                if (res.data.categories_save === true) {
                    $("div.kategori-ekle .bi-check").removeClass("d-none")
                    $("div.kategori-ekle .bi-x-circle").addClass("d-none")
                }
                if (res.data.categories_save === false) {
                    $("div.kategori-ekle .bi-check").addClass("d-none")
                    $("div.kategori-ekle .bi-x-circle").removeClass("d-none")
                }
            })
            .catch(error => {
                console.log(error)
                if (res.data.categories_save === false) {
                    $("div.kategori-ekle .bi-check").addClass("d-none")
                    $("div.kategori-ekle .bi-x-circle").removeClass("d-none")
                }
            })

    });
    // $("#urun-ekle").on("click", () => {
    //     axios.post("panel/productsAdd")
    // });


}) // ÜRÜN KATEGORİ EKLE
$(() => {
    function validateDigit($pass) {
        const passReg = /[1-9]/g;
        const check = $pass.match(passReg)
        if (!check) return true
        if (check) return false
    }//Digit.
    $("#validationCustom01").on("keyup", (data) => {
        const form_first_name = data.target.value
        const form_last_name_check = validateDigit(form_first_name)
        if (form_first_name.length >= 4 && form_last_name_check === true) { $("#validationCustom01").addClass("is-valid").removeClass("is-invalid") }
        if (form_first_name.length < 4 || form_last_name_check === false) { $("#validationCustom01").addClass("is-invalid").removeClass("is-valid") }
    });
    $("#validationCustom02").on("keyup", (data) => {
        const form_first_name = data.target.value
        const form_last_name_check = validateDigit(form_first_name)
        if (form_first_name.length >= 4 && form_last_name_check === true) { $("#validationCustom02").addClass("is-valid").removeClass("is-invalid") }
        if (form_first_name.length < 4 || form_last_name_check === false) { $("#validationCustom02").addClass("is-invalid").removeClass("is-valid") }
    });
    $("#validationCustom03").on("keyup", (data) => {
        const form_first_name = data.target.value
        const form_last_name_check = validateDigit(form_first_name)
        if (form_first_name.length >= 4 && form_last_name_check === false) { $("#validationCustom01").addClass("is-valid").removeClass("is-invalid") }
        if (form_first_name.length < 4 || form_last_name_check === true) { $("#validationCustom01").addClass("is-invalid").removeClass("is-valid") }
    });
    // mail kontrol **************************
    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }
    $("#validationCustom04").on("keyup", (data) => {
        const form_email = data.target.value
        const check_email = validateEmail(form_email)
        if (check_email === true) { $("#validationCustom04").addClass("is-valid").removeClass("is-invalid") }
        if (check_email === false) { $("#validationCustom04").addClass("is-invalid").removeClass("is-valid") }

    });
    // // password kontrol **************************
    function validateUppercase($pass) {
        const passReg = /[A-Z]/;
        const check = $pass.match(passReg)
        if (check) return true
        if (!check) return false
    }//Uppercase Alphabet.
    function validateLowercase($pass) {
        const passReg = /[a-z]/;
        const check = $pass.match(passReg)
        if (check) return true
        if (!check) return false
    }//Lowercase Alphabet.
    function validateSpecial($pass) {
        const passReg = "[!@@#$%^&*]";
        const check = $pass.match(passReg)
        if (check) return true
        if (!check) return false
    }//Special Character.
    $("#validationCustom05").on("keyup", (data) => {
        const form_pass = data.target.value
        const uppercaseCheck = validateUppercase(form_pass)
        if (uppercaseCheck === true) {
            $("#uppercase .bi-check2-square").addClass("d-inlineblock").removeClass("d-none")
            $("#uppercase .bi-file-excel").addClass("d-none").removeClass("d-inlineblock")
        } else if (uppercaseCheck === false) {
            $("#uppercase .bi-check2-square").addClass("d-none").removeClass("d-inlineblock")
            $("#uppercase .bi-file-excel").addClass("d-inlineblock").removeClass("d-none")
        }
        const lowercaseCheck = validateLowercase(form_pass)
        if (lowercaseCheck === true) {
            $("#lowercase .bi-check2-square").addClass("d-inlineblock").removeClass("d-none")
            $("#lowercase .bi-file-excel").addClass("d-none").removeClass("d-inlineblock")
        } else if (lowercaseCheck === false) {
            $("#lowercase .bi-check2-square").addClass("d-none").removeClass("d-inlineblock")
            $("#lowercase .bi-file-excel").addClass("d-inlineblock").removeClass("d-none")
        }
        const numberCheck = validateDigit(form_pass)
        if (numberCheck === false) {
            $("#number .bi-check2-square").addClass("d-inlineblock").removeClass("d-none")
            $("#number .bi-file-excel").addClass("d-none").removeClass("d-inlineblock")
        } else if (numberCheck === true) {
            $("#number .bi-check2-square").addClass("d-none").removeClass("d-inlineblock")
            $("#number .bi-file-excel").addClass("d-inlineblock").removeClass("d-none")
        }
        const specialCheck = validateSpecial(form_pass)
        if (specialCheck === true) {
            $("#special .bi-check2-square").addClass("d-inlineblock").removeClass("d-none")
            $("#special .bi-file-excel").addClass("d-none").removeClass("d-inlineblock")
        } else if (specialCheck === false) {
            $("#special .bi-check2-square").addClass("d-none").removeClass("d-inlineblock")
            $("#special .bi-file-excel").addClass("d-inlineblock").removeClass("d-none")
        }


        // problemli i lere ek bir class vermek gerekiyor
        const passcheck = $("#liveToast .bi-check2-square").length
        if (passcheck >= 4) {
            $("#validationCustom05").addClass("is-valid").removeClass("is-invalid")
            $("#liveToast").addClass("hide").removeClass("d-block")
        } else {
            $("#validationCustom05").addClass("is-invalid").removeClass("is-valid")
            $("#liveToast").removeClass("hide").addClass("d-block")
        }
        console.log(passcheck)
    })

}) // USER KONTROL
$(() => {
    const page_url = document.location.pathname
    const page_url_split = page_url.split("panel/")
    $(`div.menuLeft a[href]`).removeClass("active")
    if (page_url_split.length > 1) $(`a[href="/panel/${page_url_split[1]}"]`).addClass("active")
})// LEFT MENU ACTİVE
$(() => {
    $("#catacory_add").on("click", function () {
        const getURL = "/panel/categoriesAdd"
        axios.get(getURL, axios_config)
            .then(res => {
                if (res.data === true) { alert("işlem başarılı") }
                if (res.data === false) { alert("tekrar deneyiniz") }
            })
    });
}) // PANEL KATEGORİ EKLEME 
$(() => {
    $("#product_add").on("click", function () {
        const getURL = "/panel/productAdd"
        axios.get(getURL, axios_config)
            .then(res => {
                if (res.data === true) { alert("işlem başarılı") }
                if (res.data === false) { alert("tekrar deneyiniz") }
            })
    });
}) //PANEL ÜRÜNLERİ EKLEME
function click_kategori_urun_gor_button(click_button_id) {
    const check_dnone = $(`.${click_button_id} .d-none`)
    if (check_dnone.length > 0) $(`.${click_button_id} .shopier_body`).removeClass("d-none");
    if (check_dnone.length < 1) $(".shopier .shopier_body").addClass("d-none");
}
$(() => {
    $("#shopier_kategori").on("click", function () {
        const click_button_id = $(this).attr("id")
        click_kategori_urun_gor_button(click_button_id)
    });
    $("#shopier_urun").on("click", function () {
        const click_button_id = $(this).attr("id")
        click_kategori_urun_gor_button(click_button_id)
    });
}) // URUNLERİ / KATEGORİ GÖR BUTONU PANEL
$(() => {
    $("button[data-catacory_delete-id]").on("click", function (e) {
        const delete_id = $(e.target).attr("data-catacory_delete-id")
        axios.post("panel/categoriesDelete", { delete_id }, axios_config)
            .then(res => {
                if (res.data === false) alert("hatalı id")
                if (res.data === true) {
                    alert("işlem başarılı")
                    document.location.reload()
                }
            })
    });
})// KATEGORİ SİLME
$(() => {
    $(".product .card button.ayrinti").on("click", function () {
        const target_display_none = $(this).parents(".card").children(".d-none")
        if (target_display_none.length > 0) $(this).parents(".card").children(".d-none").fadeOut("slow", function () {
            $(this).removeClass("d-none")
        });
        if (target_display_none.length === 0) $(this).parents(".card").children(".card-body").fadeIn("slow", function () {
            const target_element = $(this).parents(".card:not(.shopier_urun)")
            if (target_element.length > 0) $(target_element).children(".card-body").addClass("d-none")

        })
    });
}) ///PANEL ADMİN PRODUCT CARD BODY HİDE SHOW
$(() => {
    $('button[data-product_delete-id]').on("click", async function () {
        const product_id = $(this).attr("data-product_delete-id")
        const url = "/panel/deleteProduct"
        const data = {
            product_id
        }
        const check = await axios.post(url, data, axios_config)
        if (check.data === true) alert("işlem başarılı")
        if (check.data === false) alert("bir hata oluştu")
    });
}) /// PRODUCT DELETE
$(() => {
    $("button[data-product_youtube_delete-id]").on("click", function () {
        const product_id = $(this).attr("data-product-id")
        const url_post = "panel/youtubeLinkDelete"
        const axios_data = {
            product_id
        }
        axios.post(url_post, axios_data, axios_config)
            .then(res => {
                if (res.data === true) alert("kayıt başarılı")
                if (res.data === false) alert("lütfen tekrar deneyiniz")
            })
    });
    $("button[data-youtube-product-id]").on("click", function () {
        const product_id = $(this).attr("data-youtube-product-id")
        const youtube_video_link = $(`input[name='data-youtube-${product_id}']`).val()
        const url_post = "panel/youtubeLinkAdd"
        const axios_data = {
            product_id,
            youtube_video_link
        }
        axios.post(url_post, axios_data, axios_config)
            .then(res => {
                if (res.data === true) alert("kayıt başarılı")
                if (res.data === false) alert("lütfen tekrar deneyiniz")
            })
    });
})// PRODUCT  YOUTUBE LİNK ADD DELETE

function axios_post_panel(url, data, authorization) {
    const config = {
        baseURL: document.location.origin,
        headers: {
            'Authorization': `Bearer ${authorization}`
        },
    }
    const axios_data = {
        data
    }
    return axios.post(url, axios_data, config).then(res => { return res })
}
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}// mail kontrol **************************
function turkish_letter_lowercase(form_data) {
    return form_data
        .replace(/İ/g, "i")
        .replace(/Ü/g, "ü")
        .replace(/Ö/g, "ö")
        .replace(/Ç/g, "ç")
        .toLowerCase()
}
// // password kontrol **************************
function validateUppercase(pass) {
    const passReg = /[A-Z]/;
    const check = pass.match(passReg)
    if (check) return true
    if (!check) return false
}//Uppercase Alphabet.
function validateLowercase(pass) {
    const passReg = /[a-z]/;
    const check = pass.match(passReg)
    if (check) return true
    if (!check) return false
}//Lowercase Alphabet.
function validateSpecial(pass) {
    const passReg = "[!@@#$%^&*]";
    const check = pass.match(passReg)
    if (check) return true
    if (!check) return false
}//Special Character.
// // password kontrol **************************

$(() => {
    $("#button-forgetpass").on("click", async () => {
        const email_form_data = $("#forgetpass").val()
        const email_form_data_lowercase = turkish_letter_lowercase(email_form_data)
        const email_data_check = validateEmail(email_form_data_lowercase)
        const token = getCookie("Authorization")
        const token_split = token.split("Bearer ")[1]
        const url = "/login/updatepass"
        if (email_data_check === false) { alert("mail adresini kontrol ediniz.") }
        if (email_data_check === true) {
            const [acct] = await Promise.all([axios_post_panel(url, email_form_data_lowercase, token_split)]);
            if (acct.data.success === true) alert(acct.data.message)
            if (acct.data.success === false) alert(acct.data.message)
        }
    })
})// CHANGE FORM PASSWORD

$(() => {
    $('#accordionFlushUser li span[data-bs-toggle="collapse"]').on("click", function () {
        const target_check = $(this).attr("aria-expanded")
        if (target_check === "true") {
            $(this).parent("li").children(".bi-caret-down-fill").addClass("d-none")
            $(this).parent("li").children(".bi-caret-up-fill").removeClass("d-none")
        }
        if (target_check === "false") {
            $(this).parent("li").children(".bi-caret-down-fill").removeClass("d-none")
            $(this).parent("li").children(".bi-caret-up-fill").addClass("d-none")
        }

    });
}) // COLLAPSE PANEL FAVORİ ÜRÜNN OK ANİMASYONU

$(() => {
    $("[data-pass-reset]").on("click", function () {
        const axios_data = $(this).attr("data-pass-reset")
        const url = "/login/updatepass"
        const token = (axios_config.headers.Authorization).split("Bearer ")[1]
        axios_post_panel(url, axios_data, token)
        alert("mailinizi kontrol ediniz")
    });
}) // şifre GÜNCELLEME
function card_product(user_id, element) {
    $(`div#flush-${user_id} .row`)
        .append(`
        <div class="col">

            <div class="card product text-bg-dark">
                <img 
                src="${element.media[0].url}"           
                class="card-img" alt="product image">
                <div
                data-bs-toggle="modal" 
                data-bs-target="#productModal"
                data-product-id="${element._id}"
                    class="card-img-overlay">
                    <h5 class="card-title text-capitalize">${element.title}</h5>
                    <p class="card-text">fiyat: ${element.price_data.discountedPrice}</p>
                </div>
                </div>

        </div> 
        `)
}
$(() => {
    $("span[data-bs-target]").on("click", async function () {
        const target_data = $(this).attr("data-bs-target")
        const user_id = target_data.split("#collapseFavori")[1]
        const url = "/panel/favori"
        const data = { user_id }
        const authorization = getCookie("Authorization").split("Bearer ")[1]
        const check = await axios_post_panel(url, data, authorization)
        if (check.data.success === true) {
            const user_id = check.data.user_id
            const product_data = check.data.data
            $(`div#flush-${user_id} .row div.col`).remove()
            $(`div#flush-${user_id} .row p`).remove()
            if (product_data.length > 0) {
                for (let index = 0; index < product_data.length; index++) {
                    const element = product_data[index];
                    card_product(user_id, element)
                }
            } else if (product_data.length === 0) {
                $(`div#flush-${user_id} .row`).append(`<p class="w-100 text-capitalize">favoriye eklediğiniz ürün bulunmamaktadır.</p>`);
            }
        }
    });
}) // PANELDEKİ FAVORİ BÖLÜMÜ
$(() => {
    $("ul.kullanici-kontrol select ").on("change", function () {
        const target = $("#accordionFlushUser button span")
        const check = $(this).children("option:selected").val()
        for (let index = 0; index < target.length; index++) {
            const element_active_check = $(target[index]).attr("data-acitive");
            const target_parent = $(target[index]).parents(".accordion-item");
            if (check === element_active_check) { $(target_parent).fadeIn() }
            if (check !== element_active_check) { $(target_parent).fadeOut() }
        }
    });
    $("ul.kullanici-kontrol input[name='search']").on("change", function () {
        const target = $("#accordionFlushUser .accordion-item")
        const check = $(this).val().toLowerCase()
        const check_item = $("#accordionFlushUser .accordion-item button strong") //.textContent //.val().trim().toLowerCase()

        check_item.filter((i, v) => {
            const check_item_parents = $(v).parents(".accordion-item")
            const check_data = $(v).text().toLowerCase().indexOf(check)
            if (check_data > -1) $(check_item_parents).fadeIn()
            if (check_data === -1) $(check_item_parents).fadeOut()
        })
    });
}) // PANEL KULLANICI KONTROL FİLTER

$(() => {
    $("[data-sorgu-product-id]").on("click", async function () {
        const target_parent = $(this).parents(".product-search").children(".product-data").children(".card")
        $(target_parent).children(".card-body:nth-child(1)").removeClass("d-none")
        $(target_parent).children(".card-body:nth-child(2)").addClass("d-none").children().remove()

        const product_id = $(this).attr("data-sorgu-product-id")
        const url = "/panel/searchProduct"
        const data = {
            product_id
        }
        const authorization = token_data.split("Bearer ")[1]
        const check = await axios_post_panel(url, data, authorization)
        if (check.data.success === true) {
            const target_parent = $(this).parents(".product-search").children(".product-data").children(".card")
            $(target_parent).children(".card-body").toggleClass("d-none")
            const product_data = check.data.data
            $(target_parent).children(".card-body:nth-child(2)").append(`
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${product_data.product_img_url}" class="img-fluid rounded-start w-100" alt="urun image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title text-capitalize text-secondary">${product_data.product_title}</h5>
                        <p class="card-text text-capitalize text-secondary">fiyat: <span>${product_data.product_fiyat}</span><i class="ms-1 fa-solid fa-turkish-lira-sign"></i></p> 
                    </div>
                </div>
            </div>
                `)
        }
        if (check.data.success !== true) {
            const target_parent = $(this).parents(".product-search").children(".product-data").children(".card")
            $(target_parent).children(".card-body:nth-child(1)").removeClass("d-none")
            $(target_parent).children(".card-body:nth-child(2)").addClass("d-none").children().remove()
        }
    });
    $("button.siparis").on("click", async function () {
        const target = $(this).attr("data-bs-target")
        const target_element = $(`ul[data-target-id='${target}'] li`)
        for (let index = 0; index < target_element.length; index++) {
            const element = target_element[index];
            $(element).children().remove()
            const product_id = $(element).attr("data-urun-id")
            const url = "/panel/searchProduct"
            const data = {
                product_id
            }
            const authorization = token_data.split("Bearer ")[1]
            const check = await axios_post_panel(url, data, authorization)
            const product_data = check.data.data

            $(element).append(`
                    <div class="card">
                        <img src="${product_data.product_img_url}" class="card-img-top" alt="ürün resmi">
                        <div class="card-body">
                            <p class="card-text">${product_data.product_title}</p>
                            <p class="card-text">fiyat: ${product_data.product_fiyat}</p>
                        </div>
                    </div>
                `)
        }
    });
    async function kargo_data(odeme_id, parametre, deger) {
        const url = "/panel/kargo"
        const axios_data = {
            odeme_id,
            parametre,
            deger
        }
        const token = `${token_data.split("Bearer ")[1]}`
        const check = await axios_post_panel(url, axios_data, token)
        const check_data = check.data
        return check_data
    }
    $("button[data-odeme-number-id]").on("click", async function () {
        const odeme_id = $(this).attr("data-odeme-number-id")
        const parametre = "cargo_number"
        const deger = $(`input.data-odeme-number-${odeme_id}`).val()
        const check = await kargo_data(odeme_id, parametre, deger)
        if (check === true) alert("işlem başarılı")
        if (check === false) alert("tekrar deneyiniz")
    });
    $("button[data-odeme-company-id]").on("click", async function () {
        const odeme_id = $(this).attr("data-odeme-company-id")
        const parametre = "cargo_company"
        const deger = $(`input.data-odeme-company-${odeme_id}`).val()
        const check = await kargo_data(odeme_id, parametre, deger)
        if (check === true) alert("işlem başarılı")
        if (check === false) alert("tekrar deneyiniz")
    });
}) // SİPARIŞ İŞLEMLERİ VE ÖDEME İŞLEMLERİ ÜRÜN SORGULAMA GETİRME
async function onay_red(onay_red, odeme_id) {
    const url = "/panel/odemeActiveChange"
    const authorization = token_data.split("Bearer ")[1]
    const data = {
        onay_red,
        odeme_id
    }
    await axios_post_panel(url, data, authorization)
    document.location.reload()
}
$(() => {
    $("button.onay").on("click", function () {
        const odeme_id = $(this).attr("data-db-id")
        onay_red(true, odeme_id)
    });
    $("button.red").on("click", function () {
        const odeme_id = $(this).attr("data-db-id")
        onay_red(false, odeme_id)
    });
})// ODEME ACTİVE PASİVE DEĞİŞİMİ

$(() => {
    $("button[data-user-change]").on("click", async function () {
        const target = $(this)[0].previousElementSibling
        const target_name = $(target).attr("name")
        const target_data = $(target).val()
        if (target_data.length <= 3) alert("lütfen geçerli bir değer giriniz")
        if (target_data.length > 3) {
            const url = "/panel/userDataChange"
            const data = {
                target_name,
                target_data
            }
            const authorization = token.split("Bearer ")[1]
            const check = await axios_post_panel(url, data, authorization)
            if (check.data.success === true) alert("başarılı")
            if (check.data.success === false) alert("tekrar deneyiniz")
        }
    });
}) // PANEL KULLANICI İŞLEMLERİ VERİ DEĞİŞTİRME

$(() => {
    const interval_second = 1000
    const interval_minute = Number(interval_second) * 60
    const interval_hours = Number(interval_minute) * 60
    const interval_day = Number(interval_hours) * 24


    const path = document.location.pathname
    const target_path = path.split("/panel/")[1]
    if (target_path === "odeme") {
        var interval_odeme_sayfa = setInterval(function () {
            document.location.reload()
        }, interval_hours * 2);

        $(".clear-interval-close").on("click", function () {
            clearInterval(interval_odeme_sayfa);
            $(".clear-interval-open").removeClass("d-none")
            $(".clear-interval-close").addClass("d-none")
        });
        $(".clear-interval-open").on("click", function () {
            document.location.reload()
        });
    }
}) // PANEL ÖDEME SAYFASI YENİLEME İŞLEMİ
$(() => {
    $('button[name="whatsup"]').on("click", async function () {

        const tel_number = "05517026813"
        const template = "reklam2" // siparis // reklam2
        const text = null // "deneme mesajı"

        const url = "/panel/whatsapp"
        const post = {
            success: true,
            tel_number,
            template,
            text
        }
        await axios.post(url, post, axios_config)
            .then(res => {
                if (res.data.success === true) {
                    alert("başarılı")
                }
            })
    });
}) /// WHATSUPP 