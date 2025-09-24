$(document).ready(function() {
    // Apply scroll insets dynamically
    let viewportHeight = $(window).height() ?? 0;
    let headerHeight = $('header').outerHeight() ?? 0;
    let footerHeight = $('footer').outerHeight() ?? 0;
    let lastSectionHeight = $('section').last().outerHeight() ?? 0;
    $('section').first().css('margin-top', headerHeight);
    $('section').last().css('margin-bottom', Math.max(viewportHeight - headerHeight - lastSectionHeight - footerHeight, 0));
    $(window).on('resize', function () {
        headerHeight = $('header').outerHeight() ?? 0;
        // Apply initial top inset
        $('section').first().css('margin-top', headerHeight);
        $('section').last().css('margin-bottom', Math.max(viewportHeight - headerHeight - lastSectionHeight - footerHeight, 0));
    })


    // Display nav menu on hamburger button click
    $('#nav-menu-button').on('click', function () {
        $('#mobile-nav-menu').toggleClass('hidden');
    });

    // Close the nav menu on item click
    $('#mobile-nav-menu a').on('click', function () {
        $('#mobile-nav-menu').toggleClass('hidden');
    })

    // Nav link tracking section
    const sections = $('section');
    const navLinks = $('.nav-link');
    $(window).on('scroll', function () {
        let topOffset = $(this).scrollTop() + headerHeight;
        sections.each(function () {
            let sectionTop = $(this).offset().top;
            let sectionBottom = sectionTop + $(this).outerHeight();

            if (topOffset >= sectionTop && topOffset < sectionBottom) {
                navLinks.removeClass('nav-link-active');
                navLinks.filter('[href="#' + this.id + '"]').addClass("nav-link-active");
            }
        });
    });

    // Smooth scroll on click
    navLinks.on('click', function (e) {
        if ($(this).hasClass('no-scroll')) return; // allow normal behavior
        e.preventDefault();
        let target = $(this).attr('href');
        $('html, body').animate(
        { scrollTop: $(target).offset().top - headerHeight }, // adjust offset for header height
        500 // duration in ms
        );
    });
})