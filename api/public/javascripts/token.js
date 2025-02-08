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
      .append(`<p class="m-0 p-0 text-capitalize">${message}</p>`);
}
function login() {
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
      const axios_form_post_config = {
         baseURL: document.location.origin,
         headers: {
            authorization: `${getCookie("Authorization")}`
         },
      }
      axios.post(url, data, axios_form_post_config)
         .then(res => {
            const res_check = res.data
            if (res_check.message) {
               const message = res_check.message
               alert(message)
            }
            if (res_check.jwt) {
               const new_jwt = res_check.jwt
               document.cookie = `Authorization=Bearer ${new_jwt}`
               alert("giriş başarılı");
               document.location.href = "/"
            }
         })
   }
}
$(() => {
   $("#page_exit").on("click", () => {
      document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.location.href = "/"
   })
}) // LOGOUT BUTTON

$(() => {
   $("button#submitFormLogin").on("click", async (e) => {
      e.preventDefault()
      await token_generator.get("/tokengenerator")
         .then(res => {
            document.cookie = `Authorization= Bearer ${res.data.new_jwt}`
            login()
         })

   });

   $("button#submitFormRegister").on("click", async (e) => {
      e.preventDefault()
      function register() {
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
            const axios_form_post_config = {
               baseURL: document.location.origin,
               headers: {
                  authorization: `${getCookie("Authorization")}`
               },
            }
            axios.post(url, data, axios_form_post_config)
               .then(res => {
                  const res_check = res.data
                  if (res_check === true) {
                     alert("Kaydınız Tamamlanmıştır.");
                     document.location.href = "/"
                  }
               })
         }
      }
      await token_generator.get("/tokengenerator")
         .then(res => {
            document.cookie = `Authorization= Bearer ${res.data.new_jwt}`
            register()
         })

   });
})// SUBMİT FORM BUTTON
$(() => {
   const page_params = document.location.pathname
   const page_params_split = page_params.split("/")[2]
   if (page_params_split !== undefined || page_params_split) {
      const menu_list = $(".menuLeft li a")
      $(menu_list).each(function (i, v) {
         $(v).removeClass("active")
         const check_href = $(v).attr("href")
         console.log(page_params)
         if (check_href === page_params) $(v).addClass("active")
      });

   }

}) // PANEL LEFT MENU ACTİVE CLASS EKLEME
$(() => {
   $("#menu div.trigger").on("click", () => {
      $("#menu ul").toggleClass("d-block")
   })
})//      #menu ul show
function filter_burc_taslar(filter_key, data_filter) {
   const filter_target = $("#burclara-gore-taslar .filter .card")
   if (data_filter === "data_filter-burc") {
      $(filter_target).each(function (i, v) {
         const filter_target_value = $(v).attr(data_filter)
         const filter_check = filter_target_value.indexOf(filter_key)
         if (filter_check > 0) $(v).show()
         if (filter_check < 0) $(v).hide()
      });
   }
   if (data_filter === "data-filter-tas") {
      $(filter_target).each(function (i, v) {
         const filter_target_value = i + 1
         const filter_change_number_value = Number(filter_key)
         if (filter_target_value === filter_change_number_value) $(v).show()
         if (filter_target_value !== filter_change_number_value) $(v).hide()
      });
   }
   if (data_filter === "search_key") {
      $(filter_target).each(function (i, v) {
         const filter_target_value = $(v).text().trim().toLowerCase()
         const filter_check = filter_target_value.indexOf(filter_key)
         if (filter_check >= 0) {
            $(v).css({ "border": "2px solid red" })
            $(v).show()
         }
         if (filter_check < 0) {
            $(v).removeAttr("style")
            $(v).hide()
         }
      });
   }
}
$(() => {
   $(".burc-taslar-filter .burc-sec").on("change", function () {
      const filter_key = $(".burc-sec option:selected").val()
      filter_burc_taslar(filter_key, "data-filter-burc")

   });
   $(".burc-taslar-filter .tas-sec").on("change", function () {
      const filter_key = $(".tas-sec option:selected").val()
      filter_burc_taslar(filter_key, "data-filter-tas")
   });
   $(".burc-taslar-filter input[type='search']").on("keyup", function () {
      const filter_key = $(this).val().trim().toLowerCase()
      filter_burc_taslar(filter_key, "search_key")
   });

}) // SEARCH BURCLAR VE TAŞLAR BLOG
function tas_select() {
   $(`[data-taslarin-anlamlari-page]`).addClass("d-none")
   const taslarin_anlamlari_selected_value = $("#taslarin-anlamlari select option:selected").val()
   if (taslarin_anlamlari_selected_value !== undefined) {
      $(`[data-taslarin-anlamlari-page="${taslarin_anlamlari_selected_value}"]`).removeClass("d-none")
      $(`nav[aria-label="breadcrumb"] ol li[data-tas-name]`).remove()

      $(`nav[aria-label="breadcrumb"] ol`).append(`<li data-tas-name='${taslarin_anlamlari_selected_value}' class=" breadcrumb-item active text-capitalize" aria-current="page">${taslarin_anlamlari_selected_value}</li>`)

      const src_data = $(`[data-taslarin-anlamlari-page='${taslarin_anlamlari_selected_value}'] img`).attr("data-src")
      $(`[data-taslarin-anlamlari-page='${taslarin_anlamlari_selected_value}'] img`).attr("src", `${src_data}`)
   }
}
$(() => {
   tas_select()
   $("#taslarin-anlamlari select").on("change", function () {
      tas_select()
   });
}) // SELECKT TAŞLARIN ANLAMLARI BLOG PAGE CHANGE 
$(() => {
   const price_data = 1000
   $("#customRange3").on("change", function () {
      const range_data = $(this).val()
      $("#customRange3-price")[0].textContent = 1000 * range_data
   });
   $("#sidebar input:not(#customRange3)").on("click", (e)=> {
      const data = $("#sidebar input:not(#customRange3)")
      
      $.each(data, function (i, v) { 
         $(v).removeAttr("checked")
         $(v)[0].checked = false  
      });
      $(e.target)[0].checked = true  
   })


}) // RANGE FİLTER // PRODUCT PAGE

