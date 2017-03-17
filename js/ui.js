var menu_button_timeout;
var menu_shown = false;
function hideMenu() {
    $("#control_buttons").fadeOut();
}
function autoHideMenu() {
    if (!menu_shown)
    {
        if ($("#control_buttons").css("display") == "none")
        {
            $("#control_buttons").fadeIn(400);
        }
        clearTimeout(menu_button_timeout);
        menu_button_timeout = setTimeout(hideMenu, 3000);
    }
}
function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}
$(function() {
    stats.domElement.id = "stats";
    $("#stats").hide();

    menu_button_timeout = setTimeout(hideMenu, 3000);
    var throttled_autohidemenu = _.throttle(autoHideMenu,250);
    $(document).on("mousemove",throttled_autohidemenu).on("touchmove",throttled_autohidemenu);

    $("#mute_button").click(handleMute);

    $(".panel-button").click(function() {
        var button = $(this)
        var target = $("#" + button.attr("data-target"));
        if (target.css("display") == "block")
        {
            target.hide();
        }
        else
        {
            $(".menu-panel").hide();
            target.show();
        }
    });
    $("#fullscreen_button").click(toggleFullScreen);
    $("#menu_button").click(function() {
        var button = $(this);
        var icon = button.find(".fa");
        if (!menu_shown)
        {
            menu_shown = true;
            clearTimeout(menu_button_timeout);
            icon.removeClass("fa-bars").addClass("fa-times");
            $("#menu_overlay, .menu-button").show();
        }
        else
        {
            menu_shown = false;
            menu_button_timeout = setTimeout(hideMenu, 3000);
            icon.removeClass("fa-times").addClass("fa-bars");
            $("#menu_overlay, .menu-button, .menu-panel").hide();

        }
    });

    $("#stats_button").click(function() {
        $("#stats").toggle();
    });

    $("#input_speed").change(function() {
        speed = parseFloat($(this).val());
        $("#label_speed").html(speed.toString());
    });
    $("#input_rotation, #rotation_clockwise").change(function() {
        rotationSpeed = parseFloat( ($("#rotation_clockwise").prop("checked") ? "-" : "") + $("#input_rotation").val() );
        var displayRotationSpeed = Math.floor(parseFloat($("#input_rotation").val()) * 200);
        $("#label_rotation").html(displayRotationSpeed.toString());
    });
    $("#control_form_reset").click(function() {
        $("#control_form input[type='range']").each(function(i, el) {
            $(el).val($(el).attr('data-default'));
        });
        $("#control_form input[type='checkbox']").prop("checked",false);
        $("#control_form input").change();
    });
})
