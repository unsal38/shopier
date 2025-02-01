function form_hide() {
    const form_id_show = $("div.loginRegisterForm .show").attr("id")
    $(`div.loginRegisterForm  button[data-bs-target]`).removeClass("d-none")
    $(`div.loginRegisterForm  button[data-bs-target="#${form_id_show}"]`).addClass("d-none")
}
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
const token_generator_login = axios.create({
    baseURL: document.location.origin,
});
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

$(() => {
    $("div#loginForm").addClass("show")
    $('button[data-bs-toggle="collapse" ]').on("click", (e) => {
        const collapse_id = $(e.target).attr("data-bs-target")
        const collapse_id_split = collapse_id.split("#")[1]
        $("div.collapse").removeClass("show")
        $(`#${collapse_id_split}`).addClass("show")

    })
})// COLLAPSE SHOW HİDE BUTTON
$(() => {
    document.cookie = "Authorization= Bearer; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    token_generator_login.get("/tokengenerator/cookiecheck")
        .then(res => {
            if (res) document.cookie = `Authorization= Bearer ${res.data.new_jwt}`
        })
})// token check
$(() => {
    form_hide()
    $(`div.loginRegisterForm  button[data-bs-target]`).on("click", () => {
        form_hide()
    })

})// LOGİN REGİSTER BUTON HİDE SHOW   
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
            const [acct] = await Promise.all([axios_post(url, email_form_data_lowercase, token_split)]);
            if (acct.data.success === true) alert(acct.data.message)
            if (acct.data.success === false) alert(acct.data.message)
        }
    })
    // 





    // console.log(token_split, "çalıştı login js ")
})// FORGET PASS
$(() => {
    $("#submitFormPassChange").on("click", (e) => {
        e.preventDefault()
        const form_pass = $("#formPassChange #password").val()
        const form_repass = $("#formPassChange #repassword").val()

        const validateUppercase_data = validateUppercase(form_pass)
        const validateLowercase_data = validateLowercase(form_pass)
        const validateSpecial_data = validateSpecial(form_pass)
        $("div[role='alert']").addClass("d-none")
        $("div[role='alert'] p").remove()
        if (form_pass !== form_repass) return alert("şifre aynı değil")
        if (validateUppercase_data === false) return alert("şifrede büyük harf bulunması gerekiyor")
        if (validateLowercase_data === false) return alert("şifrede küçük harf bulunması gerekiyor")
        if (validateSpecial_data === false) return alert("şifrede özel karakter bulunması gerekiyor (!@@#$%^&*)")

        const url = "/login/passchange"
        const data = {
            data: form_pass
        }
        const params_url = document.location.pathname
        const authorization = params_url.split("token/")[1]

        axios_post(url, data, authorization)
        .then(res => {
            if(res.data.success === true) alert("Başarıyla kaydedilmiştir.")
            if(res.data.success === false)alert("hata oldu tekrar deneyiniz")
        })
    })
}) // PASSCHANGE SAYFASI FORM İŞLEMLERİ