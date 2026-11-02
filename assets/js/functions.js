$(window).on("load", function () {
  $(".pack-ul").mCustomScrollbar({
    autoHideScrollbar: true,
  });
});

$(document).ready(function () {
  // $('.counter').counterUp({
  //   delay: 10,
  //   time: 2000
  // });

  window.addEventListener("load", function (event) {
    let images = document.querySelectorAll("[data-original]");
    let lazy = lazyload(images, { src: "data-original" });
  });

  jQuery("img.lazy").lazyload();

  $(".counter").each(function () {
    console.log("tset");
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });

  //=========== FLOATING FORM STARTS
  $(".clickbutton").click(function () {
    $(".floatbutton").toggleClass("active");
    //$('.crossplus').toggleClass("rotate");
  });
  //=========== FLOATING FORM ENDS

  var selectedClass = "";
  $(".fil-cat").click(function () {
    selectedClass = $(this).attr("data-rel");
    $("#portfolio").fadeTo(100, 0.1);
    $("#portfolio div")
      .not("." + selectedClass)
      .fadeOut()
      .removeClass("scale-anm");
    setTimeout(function () {
      $("." + selectedClass)
        .fadeIn()
        .addClass("scale-anm");
      $("#portfolio").fadeTo(300, 1);
    }, 300);
  });

  $(".desk-menu").click(function () {
    $(".menu-left").toggleClass("enable");
  });

  $(".menu-lclose , .menu-lover").click(function () {
    $(".menu-left").removeClass("enable");
  });

  $("span.fa-handle").click(function () {
    $(this).parents(".sub-menu-holder").toggleClass("openable");
  });

  $(".various").click(function () {
    var leadprice = $(this).attr("name");
    $(".popupform .leadprice").val(leadprice);
  });

  $("#contactform").validate({});
  $(".validate-popupform").validate({});
  $(".validate-popupform-video").validate({});
  $(".validate-popupform-web").validate({});
  $(".validate-popupform-sending").validate({});

  var currentIP = $("meta[name=ip2loc]").attr("content");
  var key = "5XpThOAEkfgOvEJ";

  $.ajax({
    method: "get",
    url: "https://pro.ip-api.com/json/" + currentIP,
    data: { key: key },
    success: function (data) {
      if (data) {
        $("input[name=ip2loc_ip]").val(data.query);
        $("input[name=ip2loc_isp]").val(data.isp);
        $("input[name=ip2loc_org]").val(data.org);
        $("input[name=ip2loc_country]").val(data.country);
        $("input[name=ip2loc_region]").val(data.regionName);
        $("input[name=ip2loc_city]").val(data.city);
      }
    },
  });

  $("#testslider").owlCarousel({
    loop: true,
    margin: 0,
    dots: true,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsiveClass: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
  $(".slider1123").slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    cssEase: "linear",
  });
  $(".slider2").slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    fade: true,
    autoplay: true,
    cssEase: "linear",
  });
  $(".slider3").slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    fade: true,
    autoplay: true,
    cssEase: "linear",
  });

  $(".slide").slick({
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: true,
    speed: 1000,
  });

  $(".bnr-main-slider").slick({
    speed: 1400,

    dots: false,

    fade: true,
    arrows: false,

    autoplay: true,
  });
  $(".bnr-main-sliderlft-2").slick({
    speed: 1400,

    dots: false,

    fade: true,
    arrows: false,

    autoplay: true,
  });
  $(".bnr-main-sliderlft-1").slick({
    speed: 1400,

    dots: false,

    fade: true,
    arrows: false,

    autoplay: true,
  });
  $(".bnr-main-sliderRht-1").slick({
    speed: 1400,

    dots: false,

    fade: true,
    arrows: false,

    autoplay: true,
  });
  $(".bnr-main-sliderRht-2").slick({
    speed: 1400,

    dots: false,

    fade: true,
    arrows: false,

    autoplay: true,
  });
  $(".bnr-main-sliderRht-3").slick({
    speed: 1400,

    dots: false,

    fade: true,
    arrows: false,

    autoplay: true,
  });

  $("ul.tabs li").click(function () {
    var tab_id = $(this).attr("data-tab");

    $("ul.tabs li").removeClass("current");
    $(".tab-content").removeClass("current");

    $(this).addClass("current");
    $("#" + tab_id)
      .addClass("current")
      .siblings()
      .removeClass("current");
  });

  $("ul.tabs2 li").click(function () {
    var tab_id1 = $(this).attr("data-tab");

    $("ul.tabs2 li").removeClass("current1");
    $(".tab-content2").removeClass("current1");

    $(this).addClass("current1");
    $("#" + tab_id1)
      .addClass("current1")
      .siblings()
      .removeClass("current1");
  });

  // intel Tel Input
  let ip;
  let ip_value;
  $("#phone-country,#phone-coun").intlTelInput({
    // allowDropdown: false,
    // autoHideDialCode: false,
    // autoPlaceholder: "off",
    // dropdownContainer: "body",
    // excludeCountries: ["us"],
    // formatOnDisplay: false,
    geoIpLookup: function (callback) {
      $.get("https://ipinfo.io", function () {}, "jsonp").always(function (
        resp
      ) {
        var countryCode = resp && resp.country ? resp.country : "";
        callback(countryCode);
        ip = resp.ip;
      });
    },
    initialCountry: "auto",
    nationalMode: true,
    separateDialCode: true,
    // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
    // placeholderNumberType: "MOBILE",
    // preferredCountries: ['cn', 'jp'],
    // utilsScript: "<?php echo $basesurl;?>js/utils.js"
  });

  setTimeout(function () {
    $('input[name="pc"]').val($(".selected-dial-code").text());
    $('input[name="cip"]').val(ip);
    $('input[name="ctry"]').val(
      $(".country-list .country.active .country-name").text()
    );
  }, 3000);

  $("body").delegate(".country", "click", function () {
    $('input[name="pc"]').val($(this).find(".dial-code").text());
    $('input[name="cip"]').val(ip);
    $('input[name="ctry"]').val(
      $(this)
        .closest("form")
        .find(".country-list .country.active .country-name")
        .text()
    );

    /*var oldString2=$('.selected-flag').attr('title').toUpperCase();
          var newString12 = oldString2.split(':',1)[0];
                       $('input[name="ctry"]').val(newString12);*/
  });
});

$(".chat").click(function () {
  Tawk_API.toggle();
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 1) {
    $(".header123").addClass("navbar-shrink");
  } else {
    $(".header123").removeClass("navbar-shrink");
  }
});

function get_package(a) {
  $("#packages2").val(a);
  $("#packages3").val(a);

  let b = $("#packages2").val();
  $("#packages-val").val(b);

  let b3 = $("#packages3").val();
  $("#packages-val2").val(b3);
}

function get_packagess(a) {
  $("#packages3").val(a);
}

function getURLParameter(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.search
      ) || [null, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}

var val = getURLParameter("pack");
// $('#packages').val(val);

if (val == "1") {
  $("#packages").val("BASIC LOGO PACKAGE - $35.00");
}
if (val == "2") {
  $("#packages").val("STARTUP LOGO PACKAGE - $65.00");
}
if (val == "3") {
  $("#packages").val("PROFESSIONAL LOGO PACKAGE - $99.99");
}
if (val == "4") {
  $("#packages").val("BUSINESS LOGO PACKAGE - $149.99");
}
if (val == "5") {
  $("#packages").val("LOGO & WEB PACKAGE - $249.99");
}
if (val == "6") {
  $("#packages").val("START UP WEBSITE PACKAGE - $299");
}
if (val == "7") {
  $("#packages").val("PROFESSIONAL WEBSITE PACKAGE - $544");
}

if (val == "8") {
  $("#packages").val("IDENTITY WEB PACKAGE - $924");
}

if (val == "9") {
  $("#packages").val("ELITE WEB PACKAGE - $1,324");
}

if (val == "10") {
  $("#packages").val("BUSINESS WEB PACKAGE - $1,824");
}

if (val == "11") {
  $("#packages").val("BEGINNERS E-COMMERCE PACKAGE - $895");
}

if (val == "12") {
  $("#packages").val("CORPORATE E-COMMERCE PACKAGE - $1,695");
}

if (val == "13") {
  $("#packages").val("ELITE E-COMMERCE PACKAGE - $2,595");
}

$("#packages1").val($("#packages").val());
