Element.prototype.appendBefore = function (element) {
    element.parentNode.insertBefore(this, element);
}, false;

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;

const fetchSafe = (url) => {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            url,
            method: "GET",
            onload: (data) => {
                // @ts-ignore
                resolve(data.responseText);
            },
            onerror: reject,
        });
    });
};
const loadMovie = (test) => {
    const address = fetch(`https://api.themoviedb.org/3/movie/${test}/videos?api_key=63106a4799ac2ed1fdc3b8bae2c353d6`)
    .then((response) => response.json())
    .then((results) => {
        console.log(results.results[0].key);
        const as = document.createElement("div");
        as.innerHTML = '<iframe width="640" height="360" src="https://www.youtube.com/embed/' + results.results[0].key + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
        as.appendAfter(document.querySelector("body > div.container > div.movie-container > div.right > p:nth-child(3)"))
        return results.results[0].key;
    });
};
const loadTV = (test) => {
    const address = fetch(`https://api.themoviedb.org/3/tv/${test}/videos?api_key=63106a4799ac2ed1fdc3b8bae2c353d6`)
    .then((response) => response.json())
    .then((results) => {
        console.log(results.results[0].key);
        const as = document.createElement("div");
        as.innerHTML = '<iframe width="640" height="360" src="https://www.youtube.com/embed/' + results.results[0].key + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
        as.appendAfter(document.querySelector("body > div.container > div.movie-container > div.right > p:nth-child(3)"))
        return results.results[0].key;
    });
};
//tt3475734

const findtv = (test) => {
    const address = fetch(`https://api.themoviedb.org/3/find/${test}?api_key=63106a4799ac2ed1fdc3b8bae2c353d6&language=en-US&external_source=imdb_id`)
    .then((response) => response.json())
    .then((results) => {
        const fuck = results.tv_results[0].id
        const arg = loadTV(fuck)
        return arg;
    });
};
//https://api.themoviedb.org/3/find/tt3475734?api_key=63106a4799ac2ed1fdc3b8bae2c353d6&language=en-US&external_source=imdb_id
const printAddresss = async () => {
    var ssss = document.querySelector("body > div > div.title > div > a >img[src='../img/imdb.png']")
    if(ssss){
        var urls = ssss.parentNode.href;
        console.log(urls)
        var ss = "tt" + urls.split('/tt')[1];
        console.log(ss)
        if(document.querySelector("body > div.container > div.title").textContent.includes('Season')){
            const a = await findtv(ss);
        } else {
            const a = await loadMovie(ss);
        }
    }
};
printAddresss();
window.addEventListener("load", (event) => {
    printAddresss();
  console.log("page is fully loaded");
});