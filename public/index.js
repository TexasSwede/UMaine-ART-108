
let currentImg = 0; 
const interval = 3000;

$(window).ready(function () {
    // Find all elements with class .hidden and hide them using jQuery instead
    let allHidden = $(".hidden");
    allHidden.fadeOut(100, function(){
        allHidden.removeClass("hidden");
    });
    $(".title-home-icon").hide();
    
    // Wait 1 second more, to allow CSS to load/reformat elements
    setTimeout(function () {
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
        console.log("click!");
        //playSound("ding.mp3");
        let thisPageLink = $(this).closest(".page-content").data("url");
        console.log(thisPageLink);
        let thisPage = $(`[data-url="${thisPageLink}"]`);
        // Get the next page to display
        let url = $(this).data("page");
        // Fade out current page
        thisPage.fadeOut(1000, function () {
            console.log("faded out");
            // Hide current page after fading it out
            thisPage.attr("visible", false);
            let nextPage = $(`[data-url="${url}"]`);
            let nextPageTitle = nextPage.data("title");
            $("#title-text").html(nextPageTitle);
            // Set to transparent while still hidden, show it (still faded out), then fade in
            nextPage.fadeIn(1000, function(){
                $(".title-home-icon").fadeIn(750);
            });
            nextPage.attr("visible", true);
        });
    });

    $(".title-home-icon").on("click", function () {
        let thisPage = $('[visible="true"]');
        // Fade out icon and current page
        $(".title-home-icon").fadeOut(750);
        thisPage.fadeOut(1000, function () {
            // Hide current page after fading it out
            thisPage.hide();
            thisPage.attr("visible", false);
            let nextPage = $(`[data-url="index.html"]`);
            let nextPageTitle = nextPage.data("title");
            $("#title-text").html(nextPageTitle);
            // Fade out while still hidden, then show it (still faded out), and then fade in
            nextPage.fadeIn(1000);
            nextPage.attr("visible", true);
        });
    });

    $(".popup-close").on("click", function () {
        //playSound("ding.mp3");
        $(".popup-window").fadeOut(800, function () {
            $(".popup-window").hide();
            let pageContent = $('[data-url="index.html"]');
            console.log("closed");
            pageContent.fadeIn(1500);
            pageContent.attr("visible", true);
        });
    });

    $(".campaign-navigation-button .dot").on("click", function(){
        let clicked = $(this).attr("id").slice(4);
        console.log(clicked);
        changeSlide(clicked);
    });

});

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