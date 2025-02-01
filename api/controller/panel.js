const db_search = require("../lib/db_search")

const pane_params_get = async (req, res) => {
  const page_check = req.params.page
  if(!page_check) var page = null
  if(page_check) var page = req.params.page

  // var permissions = req.permissions
  var permissions = "user"
  
  var user_id = req.id

  const user_data = await db_search.find_by_id(user_id)
  var first_name = user_data.first_name

  if (permissions === "admin") {
    var page_name = 'panel_admin'
    var title = "Admin panel"
  }

  if (permissions === "user") {
    var title = "kullanıcı paneli"
    var not_page = ["kullanici_kontrol"]
    const check_page_permission = not_page.filter(pages => pages === page)
    if (check_page_permission.length === 0) var page_name = 'panel_user'
    if (check_page_permission.length > 0) var page_name = 'panel_error'
  }
  const page_params = "panel"
  res.render(page_name, {
    title,
    permissions,
    page,
    first_name,
    page_params,
    javascript_file: null,
    javascript_file1: null,
    javascript_file2: null,
    
  });

}

module.exports = {
  pane_params_get
}