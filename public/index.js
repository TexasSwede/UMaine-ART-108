
$(window).ready(function () {
    //alert("foo");
    setTimeout(function () {
        $(".fade-in-on-load").fadeTo(750, 1);
    }, 1000);

    $(".wrapper-bulletpoint").on("click", function(){
        playSound();
    });
});

function playSound () {
	let snd = new Audio('./assets/ding.mp3');
	snd.play();
}