
const { find_one, find_db, find_by_id } = require("../lib/db_search")
const pane_params_get = async (req, res) => {
  try {
    const page_check = req.params.page
    if (page_check === "...") return
    if (!page_check || page_check === undefined) var page = null
    if (page_check) var page = req.params.page

    var permissions = req.permissions
    //var permissions = "user"

    var user_id = req.id

    const user_data = await find_by_id(user_id, "Users")
    var first_name = user_data.first_name

    if (permissions === "admin") {
      var page_name = 'panel_admin'
      var title = "Admin panel"
      var page_user_data = await find_db("Users")


      var order_data_all = await find_db("Odeme")
      var order_data = new Array()
      await order_data_all.forEach((i, a) => {
        const created_by_user = i.created_by_user
        if (created_by_user !== undefined) {
          if (String(created_by_user) === user_id) {
            order_data.push(i)
          }
        }
      });
    }

    if (permissions === "user") {
      var title = "kullanıcı paneli"
      var not_page = ["kullanici_kontrol"]
      const check_page_permission = not_page.filter(pages => pages === page)
      if (check_page_permission.length === 0) var page_name = 'panel_user'
      if (check_page_permission.length > 0) var page_name = 'panel_error'
      var page_user_data = user_data

      var order_data = await find_one({ created_by_user: user_id }, "Odeme")
      var order_data_all = null
    }
    const page_params = "panel"

    if (page === null) {
      var categories_data = null
    }
    if (page !== null) {
      if (page === "qrcode_iyzco" || page === "iyzico" || page === "shopier" || page === "qrcode") {
        var categories_data = await find_db("Categories")
        var product_data = await find_db("Product")
      }
      if (page === "odeme") {
        var odeme_data = await find_db("Odeme")
      }
    }
    res.render(page_name, {
      order_data,
      order_data_all,
      odeme_data,
      page_user_data,
      categories_data,
      product_data,
      title,
      permissions,
      page,
      first_name,
      page_params,
      javascript_file: "/panel.js",
      javascript_file1: "token.js",
      javascript_file2: null,
      javascript_file3: null,
      javascript_file4: null,

    });
  } catch (error) {
    if (error) console.log(error, "panel js60")
  }


}

module.exports = {
  pane_params_get
}