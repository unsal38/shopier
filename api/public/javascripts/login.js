const token_generator_login = axios.create({
    baseURL: document.location.origin,
 });
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
    token_generator_login.get("/tokengenerator/cookiecheck")
    .then(res => {
        if(res) document.cookie = `Authorization= Bearer ${res.data.new_jwt}`
    })
})// token check