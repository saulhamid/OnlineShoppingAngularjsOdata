/// <reference path="jquery-2.2.0.js" />
/// <reference path="bootstrap.min.js" />


$(document).ready(function () {
    $(".dropdown-menu li a").click(function () {
        var selText = $(this).text();
        $(this).parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
    });


    $('.carousel .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        if (next.next().length > 0) {
            next.next().children(':first-child').clone().appendTo($(this));
        }
        else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
    });
     function checkPosition() {
            if ($(this).scrollTop() > 200) {
                $('.go-top').fadeIn(500);
            } else {
                $('.go-top').fadeOut(300);
            }
        }
        // Show or hide the sticky footer button
        $(window).scroll(checkPosition);

        // Animate the scroll to top
        $('.go-top').click(function(event) {
            event.preventDefault();

            $('html, body').animate({scrollTop: 0}, 300);
        })

        checkPosition();
        //$('.editeaccount').click(function () {
        //    $('#cus3').modal({
        //        backdrop: true,
        //        keyboard: true
        //    });
        //    $('#cus3').css('margin', '50%');
    //})
      
        $('[data-toggle="tooltip"]').tooltip();

        $('#myCarousel').carousel({
            interval: 4000
        });

        $('.carousel .item').each(function () {
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));

            if (next.next().length > 0) {

                next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');

            }
            else {
                $(this).siblings(':first').children(':first-child').clone().appendTo($(this));

            }
        });
});
