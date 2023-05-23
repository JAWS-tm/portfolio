import $ from "jquery";

// @ts-ignore
import memoji1 from "../assets/memoji/1.png";
// @ts-ignore
import memoji2 from "../assets/memoji/2.png";
// @ts-ignore
import memoji3 from "../assets/memoji/3.png";
// @ts-ignore
import memoji4 from "../assets/memoji/4.png";
// @ts-ignore
import memoji5 from "../assets/memoji/5.png";

const memojiImages = [memoji1, memoji2, memoji3, memoji4, memoji5];

$(() => {
  /* Loading screen */
  setTimeout(() => {
    $("body").addClass("loaded");
  }, 500);

  /* Mobile navbar */
  $(".phone-navbar").on("click", () => {
    $("#links ul").toggleClass("active");
  });

  /* Cards portfolio */
  const projectCards = $(".card-inner");
  const videoModal = $(".modal-container");
  // @ts-ignore
  projectCards.each((index, element) => {
    const card = $(element);

    // Click on card
    card.find(".card-face-front").on("click", () => {
      $(".is-flipped").toggleClass("is-flipped");

      card.toggleClass("is-flipped");
    });

    // Click on back button
    const flipBtn = card.find(".flip-btn");
    if (flipBtn) {
      flipBtn.on("click", () => {
        card.toggleClass("is-flipped");
      });
    }

    // If video present, show modal
    const videoBtn = card.find(".play-video");
    if (videoBtn) {
      videoBtn.on("click", () => {
        // TODO : bugs console
        videoModal
          .find("iframe")
          .attr("src", videoBtn.attr("data-video") ?? "");
        videoModal.addClass("visible");
      });
    }
  });

  /* Video modal */
  videoModal.on("click", () => {
    $(".modal-container iframe").attr("src", "");
    videoModal.removeClass("visible");
  });

  /* Memojis slideshow */
  const memojisNb = 5;
  const memojiImg = $("#memojis-img");
  let memojiIdNb = 1;
  setInterval(() => {
    if (memojiIdNb === memojisNb) memojiIdNb = 1;

    memojiImg.addClass("hide-memoji");

    setTimeout(() => {
      memojiImg.attr("src", memojiImages[memojiIdNb]);
      memojiImg.removeClass("hide-memoji");
      memojiImg.addClass("show-memoji");
      setTimeout(() => {
        memojiImg.removeClass("show-memoji");
      }, 100);
    }, 500);

    memojiIdNb += 1;
  }, 5000);

  /* Typewriter effect */
  const txtList = ["Étudiant", "Développeur", "Passionné"];
  let currentWordId = 0;

  let i = txtList[0].length;
  let append = false;
  //   let changeState = false;
  function typeWriter() {
    if (i < txtList[currentWordId].length && append) {
      $(".gradient-text").html(
        $(".gradient-text").html() + txtList[currentWordId].charAt(i)
      );

      i += 1;
      if (i === txtList[currentWordId].length)
        setTimeout(() => {
          append = false;
        }, 4000);
    } else if (i > 0 && !append) {
      $(".gradient-text").html($(".gradient-text").html().slice(0, -1));

      i -= 1;
      if (i === 0)
        setTimeout(() => {
          append = true;
          currentWordId += 1;
          if (currentWordId === txtList.length) currentWordId = 0;
        }, 500);
    }

    setTimeout(typeWriter, 100);
  }
  setTimeout(() => {
    typeWriter();
  }, 3000);

  /* Scroll loading animation && go top button */
  const dynamicSections = $(".dynamic");
  const gotTopButton = $(".go-top");
  let cooldown = false;
  const performUpdate = () => {
    if (cooldown) return;

    const scrollToTop = $(window).scrollTop();
    if (scrollToTop !== undefined) {
      if (scrollToTop > 500) gotTopButton.removeClass("hidden");
      else gotTopButton.addClass("hidden");
    }

    // @ts-ignore
    dynamicSections.each((index, element) => {
      if (
        element.getBoundingClientRect().top <=
        (window.innerHeight || document.documentElement.clientHeight) / 1.25
      ) {
        $(element).addClass("scrolled");
      }
    });

    cooldown = true;
    setTimeout(() => {
      cooldown = false;
    }, 100); // avoid unecessary calls
  };

  $(window).on("scroll", performUpdate);
  performUpdate(); // For refresh compatibility
});
