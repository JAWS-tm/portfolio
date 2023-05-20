

$(document).ready(function() {

    /* loading screen */
    setTimeout(() => {
        $("body").addClass("loaded");
    }, 500);

    /* Navbar sur mobile */
    $(".phone-navbar").click(() => {
        $("#links ul").toggleClass("active");
    });

    /* Cards portfolio */
    const projectCards = $(".card-inner");
    const videoModal = $('.modal-container');
    projectCards.each(function() {
        let card = $(this);

        card.find('.card-face-front').on('click', function() {
            $('.is-flipped').toggleClass('is-flipped');

            card.toggleClass('is-flipped');
        });
    
        let flipBtn;
        if (flipBtn = card.find('.flip-btn')){
            flipBtn.on('click', function() {
                card.toggleClass('is-flipped');
            });
        }
    
        let videoBtn;
        if (videoBtn = card.find('.play-video')){
            videoBtn.on('click', function() {
                // TODO : bugs console
                videoModal.find("iframe").attr('src', videoBtn.attr('data-video'));
                videoModal.addClass("visible");
            });
        }
    });

    /* video */
    videoModal.on('click', function() {
        $(".modal-container iframe").attr("src", '');
        videoModal.removeClass('visible');
    });

    /* Memojis slideshow */
    const memojisNb = 5;
    const memojiImg = $("#memojis-img");
    let memojiIdNb = 1;
    setInterval(function() {
        // setTimeout(() => {
            if (memojiIdNb == memojisNb)
            memojiIdNb = 1;

            memojiImg.addClass("hide-memoji");

            setTimeout(() => {
                memojiImg.attr('src', `assets/memoji_${memojiIdNb}.png`);
                memojiImg.removeClass("hide-memoji");
                memojiImg.addClass("show-memoji");
                setTimeout(() => {
                    memojiImg.removeClass("show-memoji");
                }, 100);
            }, 500);

            
            memojiIdNb++;
        // }, 2000);       
    }, 5000);
    
    /* Typewriter effect */
    
    const txtList = [
        'Étudiant',
        'Développeur',
        'Passionné'
    ];
    let currentWordId = 0;
        
    let i = txtList[0].length;
    let append = false;
    let changeState = false;
    function typeWriter() {
        if (i < txtList[currentWordId].length && append) {
            $(".gradient-text").html($(".gradient-text").html() + txtList[currentWordId].charAt(i));
            
            i++;
            if (i == txtList[currentWordId].length)
                setTimeout(() => {
                    append = false;
                }, 4000);
        } else if (i > 0 && !append) {
            $(".gradient-text").html($(".gradient-text").html().slice(0, -1));

            i--;
            if (i == 0)
                setTimeout(() => {
                    append = true;
                    currentWordId++;
                    if (currentWordId == txtList.length) currentWordId = 0; 
                }, 500);
        }

        setTimeout(typeWriter, 100);
    }
    setTimeout(() => {
        typeWriter(); 
    }, 3000);

    /* Scroll loading animation && go top button */
    const dynamicSections = $('.dynamic');
    const gotTopButton = $(".go-top");
    let cooldown = false;
    const performUpdate = function() {
        if (cooldown) return;

        if ($(window).scrollTop() > 500)
            gotTopButton.removeClass('hidden')
        else
            gotTopButton.addClass('hidden')

        dynamicSections.each(function () {
            if (this.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) / 1.25) 
                $(this).addClass("scrolled");
        })

        cooldown = true;
        setTimeout(() => {
            cooldown = false;
        }, 100); // avoid unecessary calls
    }

    $(window).scroll(performUpdate);
    performUpdate() // For refresh compatibility
});