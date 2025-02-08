const db_search = require("../lib/db_search")
const {fs_taslar_list, fs_taslar_select} = require("../lib/fs_process")
const blog_get = async (req, res) => {
  const page_name_params = req.params.page
  if (page_name_params) var page_name = page_name_params
  if (!page_name_params) var page_name = "ana sayfa"
  const permissions = req.permissions
  const page_params = "blog"

  const tas = await fs_taslar_list()

  const data_tas_select_length = tas.length
  let tas_select_array = new Array()
  for (let index = 0; index < data_tas_select_length; index++) {
    const tas_index = tas[index];
    tas_select_array.push([index + 1, tas_index.title])
  }
  //////////////////////////////////////////
  // YENİ KAYIT İÇİN KULLANILACAK
  //////////////////////////////////////////
  const created_by = "679676dcc7ac9b1c7a57b2c1"
  const title = "taşların anlamları"
  const body = 'null'
  const url = "blog/taslarin-anlamlari"
  const image = "yarari_taslar.jpeg"
  const data = {
    created_by,
    title,
    body,
    url,
    image,
  }

  //db_search.create(data, "Blog") 

  //////////////////////////////////////////
  // YENİ KAYIT İÇİN KULLANILACAK
  //////////////////////////////////////////s

  /// db BLOG METNİNİ ÇEKMEK İÇİN

  const blog_data = await db_search.find("Blog")
  // const page_data = blog_data.body

  /// db BLOG METNİNİ ÇEKMEK İÇİN

  //// SONRASINDA BLOG METİNLERNİ DB ÜZERİNDEN AKTARMAK İÇİN (HTML ELEMENTLERİ OLDUĞU GİBİ ALMAK İÇİN )
  //let ejs = require('ejs');
  const html = "" // const html = ejs.render(page_data)
  //// SONRASINDA BLOG METİNLERNİ DB ÜZERİNDEN AKTARMAK İÇİN (HTML ELEMENTLERİ OLDUĞU GİBİ ALMAK İÇİN )
  res.render('blog', {
    tas_select_array,
    tas,
    blog_data,
    html,
    page_name,
    permissions,
    page_params,
    javascript_file: "index.js",
    javascript_file1: null, // "main.js",
    javascript_file2: null, // "plugins.js",
    javascript_file3: null,
    javascript_file4: "../javascripts/token.js"
  });

}

module.exports = {
  blog_get
}