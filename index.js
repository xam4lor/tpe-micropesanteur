const m = {
    EXPRESS : require("express"),
    PATH : require("path"),
    SM : require("sitemap"),
    OS : require("os"),
    BODY_PARSER : require("body-parser")
};

const IS_HTTPS = true;
const SITE     = "tpe-micropesanteur.herokuapp.com";
const HOST = m.OS.hostname().indexOf("local") > -1 ? SITE : "localhost:8080";
const HTTP_OR_S = IS_HTTPS ? "https://" : "http://";

const PORT = process.env.PORT || 8080;
const HOST_NAME = m.OS.hostname().indexOf("local") > -1 ? HTTP_OR_S + HOST : HOST;
const URLENCODED_PARSER = m.BODY_PARSER.urlencoded({ extended: true });


// ====== GENERATION FICHIERS REFERENCEMENT  ======
let sitemap = m.SM.createSitemap({
    hostname: HOST_NAME,
    cacheTime: 600000,
    urls: [
        { url: HTTP_OR_S + SITE }
    ]
});

let app = m.EXPRESS();



app
    .get("/robots.txt", function(req, res) {
        res.header("Content-Type", "text/html");
        res.send("User-agent: *<br />Sitemap: " + HTTP_OR_S + SITE + "/sitemap.xml<br />Disallow :");
    })
    .get("/sitemap.xml", function(req, res) {
        res.header("Content-Type", "application/xml");
        res.send(sitemap.toString());
    })




    // ====== INITIALISATION ======
    .use(m.EXPRESS.static(m.PATH.join(__dirname, "public")))
    .set("views", m.PATH.join(__dirname, "views"))
    .set("view engine", "ejs")
    .use(m.BODY_PARSER.json())
    .use(m.BODY_PARSER.urlencoded({
        extended: true
    }))




    // ====== VIEWS / PAGES ======
    // index
    .get("/", (req, res) => res.render('index'))

    .get("/introduction", (req, res) => res.render('pages/0_introduction'))
    .get("/partie_I",       (req, res) => res.render('pages/1_partie_I'))
    .get("/partie_II",      (req, res) => res.render('pages/2_partie_II'))
    .get("/partie_III",     (req, res) => res.render('pages/3_partie_III'))
    .get("/sources",      (req, res) => res.render('pages/4_sources'))
    .get("/conclusion",   (req, res) => res.render('pages/5_conclusion'))




    // ====== ERRORS ======
    .use((req, res, next) => res.status(404).render('error', {
        errorCode     : 404,
        errorMessage  : 'La page n\'a pas été trouvée',
        link          : m.PATH.join(__dirname, "views/")
    }))


    // ====== LISTENING ======
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
