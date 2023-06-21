
$(window).ready(function () {
    setTimeout(function () {
        $(".title-section").fadeTo(400, 1, function() {
            $(".title-section .fade-in-on-load").fadeTo(350, 1);
            $(".popup-window").fadeTo(750, 1);
        });
        $(".title-section .fade-in-on-load").fadeTo(750, 1);
        $(".popup-window").fadeTo(750, 1);
    }, 1000);

    $(".wrapper-bulletpoint").on("click", function(){
        playSound("ding.mp3");
    });

    $(".popup-close").on("click", function() {
        playSound("ding.mp3");
        $(".popup-window").fadeTo(500,0, function() {
            $(".fade-in-on-load").fadeTo(750, 1);
        });
    });

});

function playSound (file) {
	let snd = new Audio(`./assets/${file}`);
	snd.play();
}