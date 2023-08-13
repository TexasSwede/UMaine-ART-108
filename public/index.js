
let currentImg = 0;
const interval = 3000;
const NAV_START = 0;
const NAV_TOP = 1;

$(window).ready(function () {
    // Find all elements with class .hidden and hide them using jQuery instead
    let allHidden = $(".hidden");
    allHidden.fadeOut(100, function () {
        allHidden.removeClass("hidden");
    });
    $(".title-home-icon").hide();

    // Wait 1 second more, to allow CSS to load/reformat elements
    setTimeout(function () {
        var jqxhr = $.get("http://node-red.texasswede.com:1880/speak?text=Welcome to my portfolio website", function () {
            //console.log("success");
        });
        let titleSection = $(".title-section");
        fadeOnLoad = titleSection.find(".fade-in-on-load");
        // We can remove the class now, the elements should be hidden by code above
        fadeOnLoad.removeClass("fade-in-on-load");
        // Perform fade-in and then show welcome message modal box
        fadeOnLoad.fadeIn(500, function () {
            let popup = $(".popup-window");
            popup.fadeIn(1000);
        });
    }, 1000);

    $(".page-link").on("click", function () {
        playSound("swish.mp3");
        //Get the current page
        let currentPage = $('.page-content[visible="true"]');
        // Get the next page to display
        let url = $(this).data("page");
        // Fade out current page
        currentPage.fadeOut(750, function () {
            // Hide current page after fading it out
            currentPage.attr("visible", false);
            let nextPage = $(`[data-url="${url}"]`);
            let nextPageTitle = nextPage.data("title");
            $("#title-text").html(nextPageTitle);
            // Set to transparent while still hidden, show it (still faded out), then fade in
            nextPage.fadeIn(750, function () {
                //$(".title-home-icon").fadeIn(750);
            });
            $(".title-home-icon").fadeIn(1000);
            nextPage.attr("visible", true);
        });
        navigationButtons(NAV_TOP);
    });

    $(".title-home-icon").on("click", function () {
        playSound("whoosh.mp3");
        let thisPage = $('[visible="true"]');
        // Fade out icon and current page
        thisPage.fadeOut(750, function () {
            $(".title-home-icon").fadeOut(450);
            // Hide current page after fading it out
            thisPage.hide();
            thisPage.attr("visible", false);
            let nextPage = $(`[data-url="index.html"]`);
            let nextPageTitle = nextPage.data("title");
            $("#title-text").html(nextPageTitle);
            // Fade out while still hidden, then show it (still faded out), and then fade in
            nextPage.fadeIn(750, function () {
                //navigationButtons(NAV_START);
            });
            navigationButtons(NAV_START);
            nextPage.attr("visible", true);
        });
    });

    $(".popup-close").on("click", function () {
        playSound("ding.mp3");
        $(".popup-window").fadeOut(900, function () {
            $(".popup-window").hide();
            let pageContent = $('[data-url="index.html"]');
            navigationButtons(NAV_START);
            $("#navigation-buttons").fadeIn(1200);
            pageContent.fadeIn(750);
            pageContent.attr("visible", true);
        });
    });

    $(".campaign-navigation-button .dot").on("click", function () {
        let clicked = $(this).attr("id").slice(4);
        changeSlide(clicked);
    });

    $("#logo").on("click", function () {
        var win = window.open('http://www.texasswede.com/', '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
    });
});


function navigationButtons(buttonPos) {
    if (buttonPos == NAV_START) {
        $('div.bulletpoint-icon.home').animate({ top: 0, left: 0 }, "slow");
        $('div.bulletpoint-icon.first').animate({ top: 80, left: -40 }, "slow");
        $('div.bulletpoint-icon.second').animate({ top: 147, left: -95 }, "slow");
        $('div.bulletpoint-icon.third').animate({ top: 214, left: -149 }, "slow");
        $('div.bulletpoint-icon.forth').animate({ top: 281, left: -200 }, "slow");
        $('div.bulletpoint-icon.fifth').animate({ top: 348, left: -255 }, "slow");
    } else if (buttonPos == NAV_TOP) {
        $('div.bulletpoint-icon.home').animate({ top: 39, left: -10 }, "slow");
        $('div.bulletpoint-icon.first').animate({ top: 0, left: 0 }, "slow");
        $('div.bulletpoint-icon.second').animate({ top: 0, left: 0 }, "slow");
        $('div.bulletpoint-icon.third').animate({ top: 0, left: 0 }, "slow");
        $('div.bulletpoint-icon.forth').animate({ top: 0, left: 0 }, "slow");
        $('div.bulletpoint-icon.fifth').animate({ top: 0, left: 0 }, "slow");
    }
}

function playSound(file) {
    let snd = new Audio(`./assets/${file}`);
    snd.play();
}

function changeSlide(n) {
    let imgs = $('.campaign-slider img');
    let dots = $('.dot');
    imgs.hide();
    dots.removeClass("active")

    currentImg = n;

    $(`#img-${n}`).show();
    $(`#dot-${n}`).addClass(' active');
}