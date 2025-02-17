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
               document.cookie = `Authorization=Bearer ${new_jwt}`
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
      .catch(error => console.log(error))
   return axios_res_data
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

$('img[data-bs-toggle="modal"]').on("click", async function () {
   const product_id = $(this).attr("data-product-id")
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
         console.log(err, "token js")
         alert("lütfen giriş yapınız")
      }
   }
}); /// PRODUCT MODAL DB SORGU VE APPEND


