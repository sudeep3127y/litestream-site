const ProxyApi = "https://proxy.sb543267gmailcom.workers.dev/?u=https://proxy.sb543267gmailcom.workers.dev/",
    searchapi = "/search/",
    AvailableServers = ["https://vip-gamma.vercel.app/" ,"https://api3.sb543267gmailcom.workers.dev/","https://api100.sb543267gmailcom.workers.dev/"];
function getApiServer() {
    return AvailableServers[Math.floor(Math.random() * AvailableServers.length)];
}
async function getJson(e, t = 0) {
    let a = getApiServer(""),
        r = a + e;
    if (t > 2) throw `Too many errors while fetching ${r}`;
    t > 0 && (console.log("Retrying fetch using proxy"), (r = "https://proxy.sb543267gmailcom.workers.dev/?u=" + r));
    try {
        let s = await fetch(r);
        return await s.json();
    } catch (n) {
        return console.error(n), getJson(e, t + 1);
    }
}
async function RefreshLazyLoader() {
    let e = new IntersectionObserver((e, t) => {
            e.forEach((e) => {
                if (e.isIntersecting) {
                    let t = e.target;
                    t.src = t.dataset.src;
                }
            });
        }),
        t = document.querySelectorAll("img.lzy_img");
    t.forEach((t) => {
        e.observe(t);
    });
}
function sentenceCase(e) {
    return (
        null !== e &&
        "" !== e &&
        (e = e.toString()).replace(/\w\S*/g, function (e) {
            return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
        })
    );
}
let hasNextPage = !0;
async function SearchAnime(e, t = 1) {
    let a = await getJson("/search/" + e + "?page=" + t),
        r = a.results,
        s = document.getElementById("latest2"),
        n = document.getElementById("load"),
        l = "";
    if (0 == r.length) throw "No results found";
    for (let i = 0; i < r.length; i++) {
        let o = r[i];
        o.title.toLowerCase().includes("dub") ? (o.subOrDub = "DUB") : (o.subOrDub = "SUB"),
            (l += `<a href="./anime.html?anime_id=${
                o.id
            }"><div class="poster la-anime"> <div id="shadow1" class="shadow"> <div class="dubb">${o.subOrDub.toUpperCase()}</div></div><div id="shadow2" class="shadow"> <img class="lzy_img" src="https://media.tenor.com/HEPktnyoNAgAAAAi/loading.gif" data-src="${
                o.img
            }"> </div><div class="la-details"> <h3>${sentenceCase(o.title)}</h3> <div id="extra"> <span>${o.releaseDate}</span> </div></div></div></a>`);
    }
    return (s.innerHTML += l), (n.style.display = "none"), (s.style.display = "block"), a.hasNextPage;
}
const params = new URLSearchParams(window.location.search),
    query = params.get("query");
let page = 1;
async function loadData() {
    try {
        let e = await SearchAnime(query, page);
        (hasNextPage = e), (page += 1), RefreshLazyLoader(), console.log("Search animes loaded");
    } catch (t) {
        (document.getElementById("main-section").style.display = "none"), (document.getElementById("error-page").style.display = "block"), (document.getElementById("error-desc").innerHTML = t), console.error(t);
    }
}
null == query && window.location.replace("./index.html"),
    (document.getElementById("latest").innerHTML = `Search Results: ${query}`),
    window.addEventListener("scroll", () => {
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight &&
            !0 == hasNextPage &&
            SearchAnime(query, page).then((e) => {
                (hasNextPage = e), (page += 1), RefreshLazyLoader(), console.log("Search animes loaded");
            });
    }),
    loadData();
