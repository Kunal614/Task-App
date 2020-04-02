$(document).ready(function() {
    $("#headder").hover(function() {
        $("#detail").slideDown("slow");
    });
    $("#headder").mouseleave(function() {
        $("#detail").hide();
    });
});