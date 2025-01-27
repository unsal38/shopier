//document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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

const token_generator = axios.create({
   baseURL: document.location.origin,
});
function input_check_vall(input) {
   $(input).each(function (i, v) {
      const form_data = $(v).val()
      if (!form_data) {
         const form_input_id = $(v).attr("id")
         $(`#${form_input_id}`).addClass("invalid")
         $(`#${form_input_id}`).removeClass("valid")
      }
      if (form_data) {
         const form_input_id = $(v).attr("id")
         $(`#${form_input_id}`).addClass("valid")
         $(`#${form_input_id}`).removeClass("invalid")
      }
   });
}
function alert(message) {
   $(".alert")
   .children(".text")
   .remove()
   $(".alert")
   .removeClass("d-none")
   .append(`<p class="m-0 p-0 text">${message}</p>`);
}
$(() => {
   $("#page_exit").on("click", () => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
   })
}) // LOGOUT BUTTON

$(() => {
   var axios_form_post_config = {
      baseURL: document.location.origin,
      headers: {
         authorization: `${getCookie("Authorization")}`
      },
   }
   $("button#submitFormLogin").on("click", async (e) => {
      e.preventDefault()
      const token = getCookie("Authorization")
      if (!token) {
         await token_generator.get("/tokengenerator")
            .then(res => {
               document.cookie = `Authorization= Bearer ${res.data.new_jwt}`
            })
      }
      const form_register_inputs = $("#formlogin input[type]")
      input_check_vall(form_register_inputs)
      const form_register_inputs_check = $("#formlogin input[type].valid")
      if (form_register_inputs_check.length >= 2) {
         let register_form_array = new Array()
         $(form_register_inputs_check).each(function (i, v) {
            const item = $(v).attr("id")
            const item_vall = $(v).val()
            register_form_array.push([item, item_vall])
         });
         const url = "/login/login"
         const data = { register_form_array }
         axios.post(url, data, axios_form_post_config)
         .then(res => {
            const res_check = res.data
            if(res_check.message) {
               const message = res_check.message
               alert(message)
            }
            if (res_check.jwt) {
               const new_jwt = res_check.jwt
               document.cookie = `Authorization=Bearer ${new_jwt}`
               alert("giriş başarılı");
               //document.location.href = "/"
            }
         })
      }
   });

   $("button#submitFormRegister").on("click", async (e) => {
      e.preventDefault()
      const token = getCookie("Authorization")
      if (!token) {
         await token_generator.get("/tokengenerator")
            .then(res => {
               document.cookie = `Authorization= Bearer ${res.data.new_jwt}`
            })
      }
      const form_register_inputs = $("#formRegister input[type]")
      input_check_vall(form_register_inputs)

      const form_register_inputs_check = $("#formRegister input[type].valid")
      if (form_register_inputs_check.length >= 5) {
         let register_form_array = new Array()
         $(form_register_inputs_check).each(function (i, v) {
            const item = $(v).attr("id")
            const item_vall = $(v).val()
            register_form_array.push([item, item_vall])
         });
         const url = "/login/register"
         const data = { register_form_array }


         axios.post(url, data, axios_form_post_config)
            .then(res => {
               const res_check = res.data
               if (res_check === true) {
                  alert("Kaydınız Tamamlanmıştır.");
                  document.location.href = "/"
               }
            })
      }
   });
})// SUBMİT FORM BUTTON