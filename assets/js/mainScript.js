let hosts = ["127.0.0.1"]

function rndx() {
    return Math.random(Math.random() * 100000);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function creerNuage() {
    if ($(".nuage").length >= 20) return;
    let plans = $(".parallax");
    let plan = $(plans.get(Math.floor(Math.random() * plans.length)));

    let nuage = $("<img>");

    nuage.attr("src", `assets/img/nuage_${Math.floor(Math.random() * 2)+1}.svg?random_key=${rndx()}`);
    nuage.addClass("nuage");

    if (Math.random() > 0.5) {
        nuage.addClass(["", "petit", "tpetit", "grand", "tgrand"][Math.floor(Math.random() * 5)])
        nuage.addClass(["", "rapide", "lent"][Math.floor(Math.random() * 3)])
        nuage.addClass(["", "inverse"][Math.floor(Math.random() * 2)])
        nuage.css("opacity", 0.3 + Math.random() * 0.5)
        nuage.css("top", (5 ** (2 - Math.random()) + Math.random() * 60) + "%")
        nuage.css("filter", `brightness(${0.6 + Math.random() * 0.4})`)
    } else {
        plan = $(".parallax.img-2")
        nuage.addClass("sgrand");
        nuage.addClass(["", "lent"][Math.floor(Math.random() * 2)])
        nuage.addClass(["", "inverse"][Math.floor(Math.random() * 2)])
        nuage.css("opacity", 0.1 + Math.random() * 0.1)
        nuage.css("filter", `brightness(${0.9 + Math.random() * 0.1})`)
        nuage.css("top", (70 + Math.random() * 10) + "%")
    }

    setTimeout(() => { nuage.remove() }, 60000)

    plan.append(nuage);
}

(async () => {
    while (true) {
        await sleep(Math.random() * 1000 + 2000);
        creerNuage();
    }
})()

var isReadyToShow = false;

(async () => {
    try {
        if (!hosts.includes(new URL(document.referrer).hostname)) {
            $("div[loading] img").attr("src", `assets/img/animation-chargement-entree.svg?random_key=${rndx()}`);
            await sleep(1600);
            $("div[loading] img").attr("src", `assets/img/animation-chargement.svg?random_key=${rndx()}`);
            while (!isReadyToShow) {
                await sleep(3000);
            }
        }
    } catch (e) {
        $("div[loading] img").attr("src", `assets/img/animation-chargement-entree.svg?random_key=${rndx()}`);
        await sleep(1600);
        $("div[loading] img").attr("src", `assets/img/animation-chargement.svg?random_key=${rndx()}`);
        while (!isReadyToShow) {
            await sleep(3000);
        }
    } finally {
        $("div[loading] img").attr("src", `assets/img/animation-chargement-sortie.svg?random_key=${rndx()}`);
        await sleep(1000);
        $("div[loading]").attr("loading", "ready");
        await sleep(1600);
        $("div[loading]").hide();
    }
    
})()

$(document).ready(function () {
    $(".main").scroll(function () {
        let w = Math.floor($(".main").scrollTop());

        if (w <= 200) {
            $("#returnTop").removeClass("shown");
        } else {
            $("#returnTop").addClass("shown");
        }
    });

    $(".burger").click(function (e) {
        e.preventDefault();
        $("#burger-nav").toggleClass("shown");
    })
    $(document).mouseup(function (e) {
        var container = $("#burger-nav,.burger");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass("shown");
        }
    });
    $("a:not([href^=\"#\"])").each((_, e) => {
        e.onclick = function (ev) {
            ev.preventDefault();
            (async () => {
                $("div[loading]").show();
                $("div[loading]").css("transition-delay", "0s")
                $("div[loading]").attr("loading", "");
                await sleep(1000);
                $("div[loading] img").attr("src", `assets/img/animation-chargement-entree.svg?random_key=${rndx()}`);
                await sleep(1600);
                location.href = e.href;
            })()
        };
    })
    setTimeout(() => { isReadyToShow = true }, 3000);
})
