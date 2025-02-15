
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
var axios_config = {
    baseURL,
    headers: { 'Authorization': `Bearer ${token.split("Bearer ")[1]}` }
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
        const getURL = "panel/categoriesAdd"
        axios.get(getURL, axios_config)
            .then(res => {
                if (res.data === true) {
                    alert("işlem başarılı")
                    document.location.reload()
                }
                if (res.data === false) { alert("tekrar deneyiniz") }
            })
    });
}) // PANEL KATEGORİ EKLEME 
$(() => {
    $("#product_add").on("click", function () {
        const getURL = "panel/productAdd"
        axios.get(getURL, axios_config)
            .then(res => {
                if (res.data === true) {
                    alert("işlem başarılı")
                    document.location.reload()
                }
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
    $("#buttonYoutubeDelete").on("click", function () {
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
    $("#buttonYoutubeAdd").on("click", function () {
        const product_id = $(this).attr("data-product-id")
        const youtube_video_link = $('[aria-describedby="button-youtube-add"]').val()
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
})// PRODUCT YOUTUBE LİNK ADD DELETE

function axios_post(url, data, authorization) {
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

$(()=> {
    $("#button-forgetpass").on("click", async () => {
        const email_form_data = $("#forgetpass").val()
        const email_form_data_lowercase = turkish_letter_lowercase(email_form_data)
        const email_data_check = validateEmail(email_form_data_lowercase)
        const token = getCookie("Authorization")
        const token_split = token.split("Bearer ")[1]
        const url = "/login/updatepass"
        if (email_data_check === false) { alert("mail adresini kontrol ediniz.") }
        if (email_data_check === true) {
            const [acct] = await Promise.all([axios_post(url, email_form_data_lowercase, token_split)]);
            if (acct.data.success === true) alert(acct.data.message)
            if (acct.data.success === false) alert(acct.data.message)
        }
    })
})// CHANGE FORM PASSWORD