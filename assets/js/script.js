$(document).ready(function() {
    (async () => {

        // Populate projects
        const projects = await fetch('./data/projects.json').then(a => a.json());
        const researchList = [];
        const devList = [];
        projects.forEach(a => {
            const div = `
            <div class="thumbnail-card">
                <img class="thumbnail-card-image" alt="Project image" src="${a.thumbnail ? a.thumbnail : 'res/thumb_dummy_project.png'}">
                <div class="thumbnail-card-head">
                    <span class="title">${a.title}</span>
                    <hr>
                    <p class="summary text-justify">
                        &mdash;&ldquo;${a.summary}&rdquo;
                    </p>
                    ${
                        a.keywords ?
                        `<hr>
                        <span class="summary"><ins>Keywords:</ins> ${a.keywords.join(' &middot; ')}</span>`
                        : ''
                    }
                </div>
                <div class="thumbnail-card-extra">
                    ${
                        a.tags ?
                        `<div class="flex flex-wrap justify-center md:justify-end gap-2">
                            ${a.tags.map(e => '<span class="chip">'+e+'</span>').join('')}
                        </div>`
                        : ''
                    }
                    ${
                        a.code || a.paper ?
                        `<div class="flex flex-wrap justify-center md:justify-end gap-2">
                            ${
                                a.code && a.code.link && a.code.text ? 
                                `<a href="${a.code.link}" title="Code" class="link-button" target="_blank" rel="noopener noreferrer">[${a.code.text}]</a>`
                                : ''
                            }
                            ${
                                a.paper && a.paper.link && a.paper.text ? 
                                `<a href="${a.paper.link}" title="Paper" class="link-button" target="_blank" rel="noopener noreferrer">[${a.paper.text}]</a>`
                                : ''
                            }
                        </div>`
                        : ''
                    }
                </div>
            </div>`.trim();
            (a.type == 'research' ? researchList : devList).push(div);
        });
        // Fix separators and fill
        $('#sec-research>.card').find('div').not('.section-title,.separator').remove();
        $('#sec-development>.card').find('div').not('.section-title,.separator').remove();
        $('#sec-research>.card').append(researchList);
        $('#sec-development>.card').append(devList);

        // Populate skills
        const skills = await fetch('./data/skills.json').then(a => a.json());
        const skillList = [];
        skills.forEach(a => {
            const div = `
            <div class="sticky-card">
                ${
                    a.title ?
                    `<p class="title">${a.title}</p>
                    <hr>`
                    : ''
                }
                ${
                    a.skills ?
                    `<ul>
                        ${a.skills.map(e => '<li>'+e+'</li>').join('\n')}
                    </ul>`
                    : ''
                }
            </div>
            `.trim();
            skillList.push(div);
        });
        // Fix separators and fill
        $('#sec-skills').toggle(skillList.length > 0);
        $('#grid-skills').find('div').remove();
        $('#grid-skills').append(skillList);

        // Populate publications
        const publications = await fetch('./data/publications.json').then(a => a.json());
        const publishedList = [];
        const acceptedList = [];
        const reviewList = [];
        publications.forEach(a => {
            const div = `
            <div class="listing">
                ${
                    a.date ?
                    `<div class="date listing-content-first">${a.date}</div>`
                    : ''
                }
                <div class="inner-box-pointed listing-content-second">
                    <span>${a.citation}</span>
                    ${
                        a.doi || a.preprint ? 
                        `<hr>
                        <div class="flex flex-wrap items-center">
                            ${
                                a.doi && a.doi.link && a.doi.text ?
                                `<span class="summary">
                                    <a href="${a.doi.link}" title="DOI" class="link" target="_blank" rel="noopener noreferrer">${a.doi.text}</a>
                                </span>`
                                : ''
                            }
                            ${
                                a.preprint && a.preprint.link && a.preprint.text ?
                                `<a href="${a.preprint.link}" title="Preprint" class="link-button ms-auto" target="_blank" rel="noopener noreferrer">[${a.preprint.text}]</a>`
                                : ''
                            }
                        </div>`
                        : ''
                    }
                </div>
            </div>
            `.trim();
            if (a.status == 'published') {publishedList.push(div);}
            else if (a.status == 'accepted') acceptedList.push(div);
            else reviewList.push(div);
        });
        // Fix separators and fill
        $('#subsec-publications-published').toggle(publishedList.length > 0);
        $('#subsec-publications-published').next('hr').toggle(acceptedList.length > 0);
        $('#subsec-publications-accepted').toggle(acceptedList.length > 0);
        $('#subsec-publications-accepted').next('hr').toggle(reviewList.length > 0);
        $('#subsec-publications-review').toggle(reviewList.length > 0);
        $('#subsec-publications-published').find('div').not('.subsection-title').remove();
        $('#subsec-publications-accepted').find('div').not('.subsection-title').remove();
        $('#subsec-publications-review').find('div').not('.subsection-title').remove();
        $('#subsec-publications-published').append(publishedList);
        $('#subsec-publications-accepted').append(acceptedList);
        $('#subsec-publications-review').append(reviewList);

        // Populate achievements
        const achievements = await fetch('./data/achievements.json').then(a => a.json());
        const scholarList = [];
        const confList = [];
        const certList = [];
        achievements.forEach(a => {
            const div = `
            <div class="${a.type == 'conference' ? 'listing-flip' : 'listing'}">
                <div class="date listing-content-first">${a.date}</div>
                <div class="${a.type == 'conference' ? 'inner-box-vbar' : 'inner-box-pointed'} listing-content-second">
                    <span class="title">${a.title}</span>
                    ${
                        a.subtitle ? 
                        `<br>
                        <span class="subtitle">${a.subtitle}</span>`
                        : ''
                    }
                    ${
                        a.description ? 
                        `<br><hr>
                        <span class="summary">${a.description}</span>`
                        : ''
                    }
                    ${
                        a.certificate && a.certificate.link && a.certificate.text ? 
                        `<br>
                        <a href="${a.certificate.link}" title="Certificate" class="link-button" target="_blank" rel="noopener noreferrer">[${a.certificate.text}]</a>`
                        : ''
                    }
                </div>
            </div>
            `.trim();
            if (a.type == 'conference') {
                confList.push(div);
            } else if (a.type == 'scholarship') {
                scholarList.push(div);
            } else {
                certList.push(div);
            }
        });
        // Fix separators and fill
        $('#subsec-achievements-scholarships').toggle(scholarList.length > 0);
        $('#subsec-achievements-scholarships').next('hr').toggle(confList.length > 0);
        $('#subsec-achievements-conferences').toggle(confList.length > 0);
        $('#subsec-achievements-conferences').next('hr').toggle(certList.length > 0);
        $('#subsec-achievements-certifications').toggle(certList.length > 0);
        $('#subsec-achievements-scholarships').find('div').not('.subsection-title').remove();
        $('#subsec-achievements-conferences').find('div').not('.subsection-title').remove();
        $('#subsec-achievements-certifications').find('div').not('.subsection-title').remove();
        $('#subsec-achievements-scholarships').append(scholarList);
        $('#subsec-achievements-conferences').append(confList);
        $('#subsec-achievements-certifications').append(certList);
    })();




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
        let topOffset = Math.ceil($(this).scrollTop() + headerHeight);
        sections.each(function () {
            let sectionTop = Math.ceil($(this).offset().top);
            let sectionBottom = sectionTop + $(this).outerHeight();
            //console.log(this.id + "-> sT:" + sectionTop + " tO:" + topOffset + " hH:" + $('header').outerHeight())
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
        //console.log("scrollTo:" + ($(target).offset().top-headerHeight) + " tO:" + $(target).offset().top + " manual:" + $('#sec-skills').offset().top)
        $('html, body').animate(
        { scrollTop: $(target).offset().top - headerHeight }, // adjust offset for header height
        500 // duration in ms
        );
    });
    $(window).trigger('scroll');
});