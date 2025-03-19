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
function cookie_check_date(cookie) {
   const data_now = Date.now()
   var date_format = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
   }).format(data_now)
   if (cookie.length === 0) {
      token_generator.get("/tokengenerator").then(res => {
         document.cookie = `Authorization= Bearer ${res.data.new_jwt}; expires=${date_format} 23:59:00 UTC; path=/;`
      })
   }
   if (cookie.length > 0) {
      token_generator.get("/tokengenerator/cookiecheck").then(res => {
         if (!res.data.user) {
            document.cookie = `Authorization= Bearer ${res.data.new_jwt}; expires=${date_format} 23:59:00 UTC; path=/;`
         }
      })
   }

}
function search_input(searc_data_target, input_search_data, parents) {
   $(searc_data_target).each(function (i, v) {
      const data_target = $(v).text().trim().toLowerCase()
      const search_conclusion = data_target.indexOf(input_search_data)
      if (search_conclusion >= 0) {
         $(v).parents(parents)
            .fadeTo("slow", 1, function () { $(this).show() });
      }
      if (search_conclusion < 0) {
         $(v).parents(parents)
            .fadeTo("slow", 0, function () { $(this).hide() });
      }
   });
}

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
   $("#alert")
      .removeClass("d-none")
   $("#alert .alert")
      .append(`<p class="m-0 p-0 text-capitalize">${message}</p>`);
}
function on_click_alert() {
   $("#alert").addClass("d-none")
   document.location.reload()
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
               const data_now = Date.now()
               var date_format = new Intl.DateTimeFormat("en-GB", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
               }).format(data_now)
               if (new_jwt) document.cookie = `Authorization= Bearer ${new_jwt}; expires=${date_format} 23:59:00 UTC; path=/;`
               alert("giriş başarılı");
               document.location.href = "/"
            }
         })
   }
}
async function axios_post(product_id) {
   const url = "/products/productModal"
   const token = await token_generator.get("/tokengenerator")
      .then(res => { return res.data.new_jwt })
   const axios_form_post_config = {
      baseURL: document.location.origin,
      headers: {
         authorization: `Bearer ${token}`
      },
   }
   const data = { product_id }
   const axios_res_data = await axios.post(url, data, axios_form_post_config)
      .then(res => {
         return res.data
      })
      .catch(error => console.log(error, "token 141"))
   return axios_res_data
}
async function axios_post_sepet_ekle(url_data, axios_data) {
   const authorization_data = getCookie("Authorization")
   const url = url_data
   const data = { axios_data }
   const axios_form_post_config = {
      baseURL: document.location.origin,
      headers: {
         authorization: `${authorization_data}`
      },
   }
   const axios_res_data = await axios.post(url, data, axios_form_post_config)
      .then(res => {
         return res.data.success
      })
      .catch(error => console.log(error, "token 158"))
   return axios_res_data
}
async function axios_post_urun_bilgileri(axios_data) {
   const authorization_data = getCookie("Authorization")
   const url = "/sepet/product"
   const data = { axios_data }
   const axios_form_post_config = {
      baseURL: document.location.origin,
      headers: {
         authorization: `${authorization_data}`
      },
   }
   const axios_res_data = await axios.post(url, data, axios_form_post_config)
      .then(res => {
         return res.data
      })
      .catch(error => console.log(error, "token 175"))
   return axios_res_data
}
async function axios_post_sepet_delete(delete_id, axios_data) {
   const authorization_data = getCookie("Authorization")
   const url = "/sepet/delete"
   const data = { delete_id, axios_data }
   const axios_form_post_config = {
      baseURL: document.location.origin,
      headers: {
         authorization: `${authorization_data}`
      },
   }
   const axios_res_data = await axios.post(url, data, axios_form_post_config)
      .then(res => {
         return res.data.success
      })
      .catch(error => console.log(error, "token 192"))
   return axios_res_data
}
async function axios_post_iyzco(axios_data) {
   const authorization_data = getCookie("Authorization")
   const url = "/sepet/iyzco"
   const data = { axios_data }
   const axios_form_post_config = {
      baseURL: document.location.origin,
      headers: {
         authorization: `${authorization_data}`
      },
   }
   const axios_res_data = await axios.post(url, data, axios_form_post_config)
      .then(res => {
         return res.data.success
      })
      .catch(error => console.log(error, "token 209"))
   return axios_res_data
}
async function axios_post_sepet_product_miktar_update(axios_data) {
   const authorization_data = getCookie("Authorization")
   const url = "/sepet/miktar"
   const data = { axios_data }
   const axios_form_post_config = {
      baseURL: document.location.origin,
      headers: {
         authorization: `${authorization_data}`
      },
   }
   const axios_res_data = await axios.post(url, data, axios_form_post_config)
      .then(res => {
         return res.data.success
      })
      .catch(error => console.log(error, "token 226"))
   return axios_res_data
}
async function axios_odeme_db_save(url, data) {
   const token = getCookie("Authorization")
   const axios_form_post_config = {
      baseURL: document.location.origin,
      headers: {
         authorization: `${token}`
      },
   }
   const axios_url = url
   const axios_data = {
      data
   }
   const axios_res_data = await axios.post(axios_url, axios_data, axios_form_post_config)
      .then(res => {
         return res.data
      })
      .catch(error => console.log(error, "token 244"))
   return axios_res_data
}
async function axios_post_favori(product_id) {
   const url = "/products/favori"
   const token = getCookie("Authorization")
   const axios_form_post_config = {
      baseURL: document.location.origin,
      headers: {
         authorization: `${token}`
      },
   }
   const data = { product_id }
   const axios_res_data = await axios.post(url, data, axios_form_post_config)
      .then(res => {
         return res.data
      })
      .catch(error => console.log(error, "token 262"))
   return axios_res_data
}
async function axios_post_favori_sil(product_id) {
   const url = "/products/favori/sil"
   const cookie = getCookie("Authorization")
   const axios_form_post_config = {
      baseURL: document.location.origin,
      headers: {
         authorization: `${cookie}`
      },
   }
   const data = { product_id }
   const axios_res_data = await axios.post(url, data, axios_form_post_config)
      .then(res => {
         return res.data
      })
      .catch(error => console.log(error, "token 279"))
   return axios_res_data
}
async function axios_post_user_data_change(change_data) {
   const url = "/panel/userDataChange"
   const token = await getCookie("Authorization")
   const axios_form_post_config = {
      baseURL: document.location.origin,
      headers: {
         authorization: `${token}`
      },
   }
   const data = { change_data }
   const axios_res_data = await axios.post(url, data, axios_form_post_config)
      .then(res => {
         return res.data
      })
      .catch(error => console.log(error, "token 296"))
   return axios_res_data
}
$(() => {
   $("#page_exit").on("click", () => {
      document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.location.href = "/"
   })
}) // LOGOUT BUTTON

$(() => {
   $("#sepetModalToggleEft .form-select").on("change", function () {
      const option_value = $(this).val()
      if (option_value === "sec") {
         const dnone_value = $("#sepetModalToggleEft .card .card-body")
         for (let index = 0; index < dnone_value.length; index++) {
            const element = dnone_value[index];
            $(element).addClass("d-none")
         }
      }
      if (option_value !== "sec") {
         $(`#${option_value}`).removeClass("d-none")
      }
   });
}) // SELECT EFT OPTİON HİDE SHOW

$(() => {
   const cookie_data = getCookie("Authorization")
   cookie_check_date(cookie_data)
   $("button#submitFormLogin").on("click", async (e) => {
      e.preventDefault()
      login()
   });

   $("button#submitFormRegister").on("click", async (e) => {
      e.preventDefault()
      function register() {
         const form_register_inputs = $("#formRegister input[type]")
         input_check_vall(form_register_inputs)
         const form_register_inputs_check = $("#formRegister input[type].valid")
         if (form_register_inputs_check.length >= 4) {
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
                     alert("Kaydınız Tamamlanmıştır. Activasyon Mailinizi kontrol ediniz");
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
})// SUBMİT FORM BUTTON LOGİN LOGOUT
$(() => {
   const page_params = document.location.pathname
   const page_params_split = page_params.split("/")[2]
   if (page_params_split !== undefined || page_params_split) {
      const menu_list = $(".menuLeft li a")
      $(menu_list).each(function (i, v) {
         $(v).removeClass("active")
         const check_href = $(v).attr("href")
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
   function filter_action(sirala_data, url_page, max_price, catagoriy) {
      const baseURL = document.location.origin
      document.location.href = `${baseURL}/products/?siralama=${sirala_data}&page=${url_page}&maxprice=${max_price}&catagoriy=${catagoriy}`
   }
   const urlSearch = document.location.search
   if (!urlSearch) $(`.active1`).addClass("active")
   if (urlSearch) {
      const sirala_data = urlSearch.split("&")[0].split("=")[1]
      const page_data = urlSearch.split("&")[1].split("=")[1]
      const maxprice_data = urlSearch.split("&")[2].split("=")[1]
      const catagory_data = urlSearch.split("&")[3].split("=")[1]
      const input_checked = $("#sidebar div.form-check input")
      const pagination = $("#product .pagination ul")

      $(input_checked).each(function (i, v) {
         $(v)[0].checked = false
      });
      $(`#sidebar div.form-check input#${sirala_data}`)[0].checked = true

      $(pagination).each(function (i, v) {
         $(v).children().removeClass("active")
      })
      $(`.active${page_data}`).addClass("active")
      // $(`#product .pagination ul li:nth-child(${Number(page_data) + 1})`).addClass("active")

      if (maxprice_data !== "null") $("#customRange3")[0].value = Number(maxprice_data) / 1000
      if (maxprice_data === "null") $("#customRange3")[0].value = 0

      const catagory_menu = $("a.catagoryTopMenu")
      $("#allcatagory").removeClass("active")
      $(catagory_menu).each(function (i, v) {
         $(v).removeClass("active")
      });

      if (catagory_data !== "all") $(`#catagory${catagory_data}`).addClass("active")
      if (catagory_data === "all") $("#allcatagory").addClass("active")



   }
   $("#customRange3").on("change", function () {
      const urlSearch = document.location.search
      const rage_value = $(this)[0].value
      $("#customRange3-price")[0].textContent = Number(rage_value) * 1000
   })

   $("#sidebar div.form-check input").on("click", function () {
      const input_checked = $("#sidebar div.form-check input")
      $(input_checked).each(function (i, v) {
         $(v)[0].checked = false
      });
      $(this)[0].checked = true

      const urlSearch = document.location.search
      if (!urlSearch) {
         const sirala_data = $(this).attr("id")
         const url_page = 1
         const max_price = "null"
         const catagoriy = "all"
         filter_action(sirala_data, url_page, max_price, catagoriy)
      }
      if (urlSearch) {
         const sirala_data = $(this).attr("id")
         const url_page = urlSearch.split("&")[1].split("=")[1]
         const max_price = urlSearch.split("&")[2].split("=")[1]
         const catagoriy = urlSearch.split("&")[3].split("=")[1]
         filter_action(sirala_data, url_page, max_price, catagoriy)
      }
   });
   $("#customRange3Button").on("click", function () {
      if (!urlSearch) {
         const rage_value = $("#customRange3")[0].value
         const sirala_data = "favori"
         const url_page = 1
         const max_price = (Number(rage_value) * 1000).toString()
         const catagoriy = "all"
         filter_action(sirala_data, url_page, max_price, catagoriy)
      }
      if (urlSearch) {
         const rage_value = $("#customRange3")[0].value
         const sirala_data = urlSearch.split("&")[0].split("=")[1]
         const page_data = urlSearch.split("&")[1].split("=")[1]
         const maxprice_data = (Number(rage_value) * 1000).toString()
         const catagoriy = urlSearch.split("&")[3].split("=")[1]
         filter_action(sirala_data, page_data, maxprice_data, catagoriy)
      }
   })
   $(".pagination ul li:not(.ico-prev):not(.ico-next)").on("click", function () {
      const pagi_number = $(this).index()
      if (!urlSearch) {
         const sirala_data = "favori"
         const url_page = pagi_number
         const max_price = "null"
         const catagoriy = "all"
         filter_action(sirala_data, url_page, max_price, catagoriy)
      }
      if (urlSearch) {
         const sirala_data = urlSearch.split("&")[0].split("=")[1]
         const page_data = pagi_number
         const maxprice_data = urlSearch.split("&")[2].split("=")[1]
         const catagoriy = urlSearch.split("&")[3].split("=")[1]
         filter_action(sirala_data, page_data, maxprice_data, catagoriy)
      }
   })
   $("a.catagoryTopMenu").on("click", function () {
      const catagory_id = $(this).attr("id")
      const id_split = catagory_id.split("catagory")[1]
      if (!urlSearch) {
         const sirala_data = "favori"
         const url_page = "1"
         const max_price = "null"
         const catagoriy = id_split
         filter_action(sirala_data, url_page, max_price, catagoriy)
      }
      if (urlSearch) {
         const sirala_data = urlSearch.split("&")[0].split("=")[1]
         const page_data = "1" // urlSearch.split("&")[1].split("=")[1]
         const maxprice_data = urlSearch.split("&")[2].split("=")[1]
         const catagoriy = id_split
         filter_action(sirala_data, page_data, maxprice_data, catagoriy)
      }
   });
   $("#allcatagory").on("click", function () {
      if (!urlSearch) {
         const sirala_data = "favori"
         const url_page = "1"
         const max_price = "null"
         const catagoriy = "all"
         filter_action(sirala_data, url_page, max_price, catagoriy)
      }
      if (urlSearch) {
         const sirala_data = urlSearch.split("&")[0].split("=")[1]
         const page_data = urlSearch.split("&")[1].split("=")[1]
         const maxprice_data = urlSearch.split("&")[2].split("=")[1]
         const catagoriy = "all"
         filter_action(sirala_data, page_data, maxprice_data, catagoriy)
      }
   });
   $(".pagination ul li.ico-prev").on("click", function () {
      if (urlSearch) {
         const pagi_number = $(".pagination ul li.active").index()
         const sirala_data = urlSearch.split("&")[0].split("=")[1]
         const url_page = Number(pagi_number) - 1
         const maxprice_data = urlSearch.split("&")[2].split("=")[1]
         const catagoriy = urlSearch.split("&")[3].split("=")[1]
         if (url_page !== 0) filter_action(sirala_data, url_page, maxprice_data, catagoriy)
      }
      if (!urlSearch) {
         const pagi_number = $(".pagination ul li.active").index()
         const sirala_data = "favori"
         const url_page = Number(pagi_number) - 1
         const max_price = "null"
         const catagoriy = "all"
         if (url_page !== 0) filter_action(sirala_data, url_page, max_price, catagoriy)
      }
   });
   $(".pagination ul li.ico-next").on("click", function () {
      const pagi_li_length = $(`#product .pagination ul`)[0].children.length
      const max_page = pagi_li_length - 2
      if (urlSearch) {
         const pagi_number = $(".pagination ul li.active").index()
         const sirala_data = urlSearch.split("&")[0].split("=")[1]
         const url_page = Number(pagi_number) + 1
         const maxprice_data = urlSearch.split("&")[2].split("=")[1]
         const catagoriy = urlSearch.split("&")[3].split("=")[1]
         if (url_page <= max_page) filter_action(sirala_data, url_page, maxprice_data, catagoriy)
      }
      if (!urlSearch) {
         const pagi_number = $(".pagination ul li.active").index()
         const sirala_data = "favori"
         const url_page = Number(pagi_number) + 1
         const max_price = "null"
         const catagoriy = "all"
         if (url_page !== max_page) filter_action(sirala_data, url_page, max_price, catagoriy)
      }
   });

})//  PRODUCT FİLTER PAGİNATİON
$(() => {
   $("input#searchİnput").on("change", function () {
      const searc_data_target = $(".inputSearch .card-title")
      const input_search_data = $(this).val().trim().toLowerCase()
      const hide_show_target = "div.col"
      search_input(searc_data_target, input_search_data, hide_show_target)

   });
}) // SEARCH İNPUT 
async function product_modal_append(product_id) {
   try {
      const data = await axios_post(product_id)
      const product_corrosel_data = new Array()
      if (data.data === true) {
         $(data.data_value_media).each(function (i, v) {
            product_corrosel_data.push(["media", v.url])
         });
         if (data.data_value_youtube_video_link) { product_corrosel_data.push(["youtube", data.data_value_youtube_video_link]) }
      }

      $("#productModal .carousel-inner .carousel-item").each(function (i, v) {
         $(v).remove()
      })
      if (product_corrosel_data.length === 0) {
         $("#productModal .carousel-inner").append(
            `<div class="carousel-item active">
         <img src="../images/logo.jpeg"class="d-block w-100" alt="product image">
         </div>`
         )
      }
      $(product_corrosel_data).each(function (i, v) {
         if (i === 0) {
            $("#productModal .carousel-inner").append(
               `<div class="carousel-item active">
            <img src="${v[1]}"class="d-block w-100" alt="product image">
            </div>`
            )
         }
         else if (i !== 0) {
            if (v[0] === "media") {
               $("#productModal .carousel-inner").append(
                  `<div class="carousel-item">
               <img src="${v[1]}"class="d-block w-100" alt="product image">
               </div>`
               )
            }
            if (v[0] === "youtube") {
               $("#productModal .carousel-inner").append(
                  `<div class="carousel-item">
               <iframe width="420" height="315" src="${v[1]}"></iframe>
               </div>`
               )
            }
         }
      });

   } catch (err) {
      if (err) {
         console.log(err, "token js 625")
         alert("lütfen giriş yapınız")
      }
   }
}
$(() => {
   $('img[data-bs-toggle="modal"]').on("click", async function () {
      const product_id = $(this).attr("data-product-id")
      product_modal_append(product_id)
   });

   $('#accordionFlushUser').on("click", function (e) { // div[data-bs-toggle]
      const target = $(e.target)
      const product_id = $(e.target).attr("data-product-id")
      if (product_id === undefined) {
         const product_id_parent = $(target).parents("div.card-img-overlay")
         if (product_id_parent.length > 0) {
            const product_id_parent = $(target).parents("div.card-img-overlay").attr("data-product-id")
            product_modal_append(product_id_parent)
         }
      }
      if (product_id !== undefined) product_modal_append(product_id)

   })
})/// PRODUCT MODAL DB SORGU VE APPEND
$(() => {
   const sepet_product_check = localStorage.getItem("product_sepet")
   if (sepet_product_check === null || undefined || sepet_product_check.length <= 10) localStorage.clear()
   $("a[href='sepetAdd']").on("click", async function (e) {
      e.preventDefault()
      var product_id = $(this).attr("data-product-id")
      const sepet_product_check = localStorage.getItem("product_sepet")
      if (sepet_product_check) {
         const new_data = {
            product_id,
            sepet_product_check
         }
         const sepet_return_data = await axios_post_sepet_ekle("/sepet/update", new_data)
         localStorage.setItem("product_sepet", `${sepet_return_data}`);
         document.location.reload()
      } else if (!sepet_product_check) {
         const new_data = { product_id, }
         const sepet_return_data = await axios_post_sepet_ekle("/sepet/ekle", new_data)
         document.location.reload()
         if (sepet_return_data === false) {
            document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.location.reload()
         } else {
            localStorage.setItem("product_sepet", `${sepet_return_data}`);
            document.location.reload()
         }
      }


   });
}) // SEPETE EKLE
async function sepet_update(target) {
   const localStorage_data = localStorage.getItem("product_sepet")
   if (localStorage_data) {
      const delete_check = await axios_post_sepet_delete(target, localStorage_data)
      if (delete_check === false) localStorage.clear()
      if (delete_check !== false) {
         localStorage.setItem("product_sepet", delete_check)
         document.location.reload()
      }
   }
}
$(async () => {
   const product_sepet = localStorage.getItem("product_sepet")

   const url_check = document.location.pathname
   if (url_check === "/sepet" || url_check === "/products" && product_sepet) {
      const product_data = await axios_post_urun_bilgileri(product_sepet)
      if (product_data.success === false) localStorage.clear()
      if (product_data.success !== false && product_data.success !== undefined) {
         function append_product(url, e, mik) {
            $("#sepet table")
               .append(`
            <tr>
               <td class="items">
                  <div class="image">
                     <img src="${url}" alt="product image">
                  </div>
                  <h3><a href="javascript:void(0)">${e.title}</a></h3>
               </td>
               <td class="price"><i class="fa-solid fa-turkish-lira-sign"></i>${e.price_data.discountedPrice}</td>
               <td id="${e._id}" data-miktar="${mik}" data-stockQuantity="${e.stockQuantity}" class="qnt">
                  <select class="sepet"></select>
               </td>
               <td class="total"><i class="fa-solid fa-turkish-lira-sign"></i><span class="totaltext"></span></td>
               <td id="${e._id}" class="delete"><a href="javascript:void(0)" class="ico-del"></a></td>
            </tr>
         `)
         }
         const new_product_data = product_data.success
         const product_miktar = product_data.miktar
         new_product_data.forEach((e, v, d) => {


            const media_product = e.media
            const mik = product_miktar[v].miktar
            if (media_product.length === 0) {
               const url = "images/logo.jpeg"
               if (Number(e.stockQuantity) > 0) { append_product(url, e, mik) }
               if (Number(e.stockQuantity) <= 0) {
                  const target = e._id
                  sepet_update(target)
               }
            }
            if (media_product.length > 0) {
               const url = e.media[0].url
               if (Number(e.stockQuantity) > 0) { append_product(url, e, mik) }
               if (Number(e.stockQuantity) <= 0) {
                  const target = e._id
                  sepet_update(target)
               }
            }
         });
         const data_check_sepet_mik = $("#sepetmiktari")
         if (data_check_sepet_mik.length > 0) {
            if (!product_data.success) $("#sepetmiktari")[0].textContent = 0
            if (product_data.success) $("#sepetmiktari")[0].textContent = product_data.success.length
         }
      }
   }
   const element_target_product_td = $("td[data-stockQuantity]")
   if (element_target_product_td) {
      const element_target_product_select_value = $("td[data-stockQuantity]")
      function add_element(element, stockQuantity_value) {
         for (let index = 1; index < Number(stockQuantity_value) + 1; index++) {
            if (stockQuantity_value >= index) {
               $(element)
                  .append(`
               <option value="${index}">${index}</option>
               `)
            }
         }
      }
      $.each(element_target_product_select_value, function (i, v) {
         const stockQuantity_value = $(v).attr("data-stockQuantity")
         add_element($(`td[data-stockQuantity] .sepet`)[i], stockQuantity_value)
      });
      const select_target = $(`td[data-stockQuantity] .sepet`)
      for (let index = 0; index < select_target.length; index++) {
         const element = $(select_target)[index];
         const data_mik_parent = $(select_target).parent()[index]
         const data_mik = $(data_mik_parent).attr("data-miktar")
         $(element).children(`option:nth-child(${data_mik})`)[0].selected = true
      }
      function total_price() {
         const target_value1 = $(`td.total`)
         const total_price = new Array()
         for (let index = 0; index < target_value1.length; index++) {
            const element = target_value1[index].textContent;
            total_price.push(Number(element))
         }
         let element = 0
         for (let index = 0; index < total_price.length; index++) {
            element += total_price[index];
         }
         const check_element = $("li.total .fa-turkish-lira-sign")
         if (check_element.length !== 0) {
            $("li.total .fa-turkish-lira-sign")[0].textContent = String(element)
            const eft_total = element - (element * 2 / 100)
            $("li.efttotal .fa-turkish-lira-sign")[0].textContent = String(eft_total)
            $("li.krkarttotal .fa-turkish-lira-sign")[0].textContent = String(element)
         }

      }
      function sepet_price() {
         const target_value = $(`td[data-stockQuantity] .sepet`)
         for (let index = 0; index < target_value.length; index++) {
            const element = target_value[index];
            const option_value = $(element).children("option:selected")[0].value
            const target_element = $(element).parents("tr")
            const product_price = $(target_element).children(".price")[0].textContent
            $(target_element).children(".total").children(".totaltext")[0].textContent = String(Number(option_value) * Number(product_price))
         }
         total_price()
      }
      sepet_price()
      $(`td[data-stockQuantity] .sepet`).on("change", async function () {
         const option_value = $(this).children("option:selected")[0].value
         const target_element = $(this).parents("tr")
         const product_price = $(target_element).children(".price")[0].textContent
         $(target_element).children(".total").children(".totaltext")[0].textContent = String(Number(option_value) * Number(product_price))
         total_price()
         const product_id = $(this).parent().attr("id")
         const miktar = option_value
         const localStorage_data = localStorage.getItem("product_sepet")


         const axios_data = {
            product_id,
            miktar,
            localStorage_data
         }
         const check_axios_mik = await axios_post_sepet_product_miktar_update(axios_data)
         localStorage.setItem("product_sepet", check_axios_mik)
         document.location.reload()
      })
   }
   $("#sepet .delete").on("click", async function () {
      const target = $(this).attr("id")
      sepet_update(target)
   });
}) // SEPET SAYFASI ÜRÜNLERİ DB ALARAK SAYFADA GÖSTERME    ////// YAPILACAK ÇALIŞMIYOR
function validateEmail($email) {
   var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailReg.test($email);
}// mail kontrol **************************
function sepet_model_button_enable(check) {
   const button = $("#sepetmodal #sepetModalToggle .modal-footer button")
   if (check === true) {
      for (let index = 0; index < button.length; index++) {
         $(button[index]).removeClass("disabled")
      }
   }
   if (check === false) {
      for (let index = 0; index < button.length; index++) {
         $(button[index]).addClass("disabled")
      }
   }
}
function check_valid() {
   const target_input_valid = $("#sepetmodal #sepetModalToggle input.is-valid").length
   const input_toplam = $("#sepetmodal #sepetModalToggle input").length
   if (Number(input_toplam) === Number(target_input_valid)) sepet_model_button_enable(true)
   if (Number(input_toplam) !== Number(target_input_valid)) sepet_model_button_enable(false)
}
async function ip() {
   try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip
   } catch (error) {
      console.error('Error fetching IP address:', error);
   }
}
async function database_save_odeme(url, check_eft_number, ip_data) {
   const target_input = $("#sepetmodal #sepetModalToggle input")
   const product_data = $("td[data-stockquantity]")
   const target_input_array = new Array()
   for (let index = 0; index < target_input.length; index++) {
      const element_name = $(target_input[index]).attr("name");
      const element_value = String($(target_input[index]).val()).trim().toLowerCase()
      if (element_name !== "sozlesmeMesafeSatıs") target_input_array.push({ element_name, element_value })
      if (element_name === "sozlesmeMesafeSatıs") {
         const element_checked_value = $(target_input[index])[0].checked
         target_input_array.push({ element_name, element_checked_value })
      }
   }
   target_input_array.push({ element_name: "check_eft_number", check_eft_number })
   const add_product_item = new Array()
   if (product_data.length > 0) {
      for (let index = 0; index < product_data.length; index++) {
         const product_id = $(product_data[index]).attr("id")
         const product_miktar = $(product_data[index]).attr("data-miktar")
         add_product_item.push({ product_id, product_miktar })
      }
      target_input_array.push({ add_product_item })
   }
   if (product_data.length === 0) return alert("ürün ekleyiniz")
   target_input_array.push({ ip_data })
   const data = {
      target_input_array
   }
   const database_save_odeme_check = await axios_odeme_db_save(url, data)
   return database_save_odeme_check
}

$(() => {
   const target_input = $("#sepetmodal #sepetModalToggle input")
   $(target_input).on("change", function () {
      const check_mail_data = $(this).attr("id")
      if (check_mail_data === "validationCustom06") {
         const mail_data = $(this).val()
         const check = validateEmail(mail_data)
         if (check === true) $(this).removeClass("is-invalid").addClass("is-valid")
         if (check === false) $(this).addClass("is-invalid").removeClass("is-valid")
         check_valid()
      }
      if (check_mail_data === "mesSatısSoz") {
         const check_form_data = $(this)[0].checked
         if (check_form_data === true) $(this).removeClass("is-invalid").addClass("is-valid")
         if (check_form_data === false) $(this).addClass("is-invalid").removeClass("is-valid")
         check_valid()
      }
      if (check_mail_data !== "validationCustom06" && check_mail_data !== "mesSatısSoz") {
         const check_data_length = $(this).val()
         if (check_data_length.length > 0) {
            $(this).removeClass("is-invalid").addClass("is-valid")
         }
         if (check_data_length.length === 0) {
            $(this).addClass("is-invalid").removeClass("is-valid")
         }
         check_valid()
      }

   });
   const target_input1 = $("#sepetmodal #sepetModalToggleEft select")
   $(target_input1).on("change", function () {
      const check_data = $(this).children("option:selected").val()
      if (check_data === "sec") $("#sepetmodal #sepetModalToggleEft .modal-footer button.odemeyitamamla").addClass("disabled")
      if (check_data !== "sec") $("#sepetmodal #sepetModalToggleEft .modal-footer button.odemeyitamamla").removeClass("disabled")
   });
   $("#sepetmodal #sepetModalToggleEft button.odemeyitamamla").on("click", async function () {
      const target_selected = String($("#sepetmodal #sepetModalToggleEft select[name='check_eft_number'] option:selected").val()).trim().toLowerCase()
      const url = "/sepet/eft"
      const ip_data = await ip()
      const finish = await database_save_odeme(url, target_selected, ip_data)
      localStorage.clear()
      if (finish.success === true) alert("işlem başarılı")
      if (finish.success === false) alert("bir hata oluştu tekrar deneyiniz")

   });

   $("#sepetmodal #sepetModalToggleİyzco button.odemeyitamamla").on("click", async function () {
      const url = "/sepet/iyzco"
      const target_selected = "iyzco"
      const ip_data = await ip()
      const finish = await database_save_odeme(url, target_selected, ip_data)
      if (finish.success === true) {
         const check_iyzco = finish.data.status
         if (check_iyzco === "success") {
            alert("işlem başarılı")
            localStorage.clear()
            const paymentPageUrl = finish.data.paymentPageUrl
            window.open(paymentPageUrl, '_blank');
         } else if (check_iyzco === "failure") {
            console.log(finish, "token js 943")
            alert("bir hata oluştu tekrar deneyiniz")
         }
      }
      if (finish.success === false) alert("bir hata oluştu tekrar deneyiniz")
   });

})// SEPET MODAL İÇERİK KONTROLÜ VERİNİN DB KAYDI

$(() => {
   $("[href='favori_ekle']").on("click", async function (e) {
      e.preventDefault()
      const target_id = $(this).attr("data-product-id")
      const axios_check = await axios_post_favori(target_id)
      if (axios_check.success === true) document.location.reload()
      if (axios_check.success === false) {
         document.location.reload()
      }
   });
}) // FAVORİYE EKLE

$(() => {
   $('a[data-product-id]').on("click", async function () {
      const target_data = $(this).children("i").attr("data-product-id")
      if (target_data !== undefined) {
         const check = await axios_post_favori_sil(target_data)
         if (check.success === true) document.location.reload()
         if (check.success === false) { alert("Bir hata oluştu tekrar deneyiniz.") }
      }

   });
}) // FAVORİ SİL

$(() => {
   $("#panelUser button[data-user]").on("click", async function () {
      const user_id = $(this).attr("data-user")
      const button_id = $(this).attr("id")
      const change_data = $(`[name='${button_id}']`).val()
      const axios_data = {
         user_id,
         change_data,
         db_name: button_id
      }
      const check = await axios_post_user_data_change(axios_data)
      console.log(check, "token js")
   });
}) // KULLANICI BİLGİLERİ DEĞİŞTİRME