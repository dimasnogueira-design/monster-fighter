/* =========================================================
   REVEAL
========================================================= */

const reveals =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("show");

        observer.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px",
    }
  );


reveals.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================================================
   COUNTERS
========================================================= */

function animateCounter(
  element,
  target,
  duration = 1300
) {

  const start =
    performance.now();


  function tick(now) {

    const progress =
      Math.min(
        (now - start) / duration,
        1
      );


    const eased =
      1 - Math.pow(1 - progress, 3);


    const value =
      Math.floor(target * eased);


    element.textContent =
      value.toLocaleString("pt-BR");


    if (progress < 1) {

      requestAnimationFrame(tick);

    } else {

      element.textContent =
        target.toLocaleString("pt-BR");

    }

  }


  requestAnimationFrame(tick);

}


function observeCounters(selector) {

  const elements =
    document.querySelectorAll(selector);


  const observer =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          const target =
            Number(
              entry.target.dataset.target
            );


          if (Number.isNaN(target)) {
            return;
          }


          animateCounter(
            entry.target,
            target
          );


          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.35,
      }
    );


  elements.forEach((element) => {
    observer.observe(element);
  });

}


observeCounters(".counter");
observeCounters(".lab-counter");


/* =========================================================
   HEADER
========================================================= */

const header =
  document.querySelector(".site-header");


function updateHeader() {

  if (!header) {
    return;
  }


  if (window.scrollY > 30) {

    header.style.background =
      "rgba(5,7,5,.96)";

    header.style.borderBottomColor =
      "rgba(255,255,255,.12)";

  } else {

    header.style.background =
      "rgba(5,7,5,.78)";

    header.style.borderBottomColor =
      "rgba(255,255,255,.09)";

  }

}


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true,
  }
);


updateHeader();


/* =========================================================
   SMOOTH ANCHORS
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const href =
          link.getAttribute("href");


        if (
          !href ||
          href === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(href);


        if (!target) {
          return;
        }


        event.preventDefault();


        const headerHeight =
          header
            ? header.offsetHeight
            : 0;


        const targetTop =
          target
            .getBoundingClientRect()
            .top
          + window.scrollY
          - headerHeight;


        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });

      }
    );

  });


/* =========================================================
   SCOOP CALCULATOR
========================================================= */

const SCOOP_PRICE = 100;


const scoopState = {
  google: 6,
  meta: 3,
  remarketing: 1,
};


function formatMoney(value) {

  return value.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }
  );

}


function setText(id, value) {

  const element =
    document.getElementById(id);


  if (element) {
    element.textContent = value;
  }

}


function updateCalculator() {

  const google =
    scoopState.google * SCOOP_PRICE;


  const meta =
    scoopState.meta * SCOOP_PRICE;


  const remarketing =
    scoopState.remarketing * SCOOP_PRICE;


  const scoops =
    scoopState.google
    + scoopState.meta
    + scoopState.remarketing;


  const total =
    scoops * SCOOP_PRICE;


  setText(
    "googleScoops",
    scoopState.google
  );


  setText(
    "metaScoops",
    scoopState.meta
  );


  setText(
    "remarketingScoops",
    scoopState.remarketing
  );


  setText(
    "googleValue",
    formatMoney(google)
  );


  setText(
    "metaValue",
    formatMoney(meta)
  );


  setText(
    "remarketingValue",
    formatMoney(remarketing)
  );


  setText(
    "totalScoops",
    `${scoops} ${
      scoops === 1
        ? "SCOOP"
        : "SCOOPS"
    }`
  );


  setText(
    "mediaTotal",
    `${formatMoney(total)}/mês`
  );


  setText(
    "summaryMedia",
    `${formatMoney(total)}/mês`
  );

}


document
  .querySelectorAll(
    ".calc-control button"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const channel =
          button.dataset.channel;


        const action =
          button.dataset.action;


        if (
          !channel ||
          !Object.prototype.hasOwnProperty.call(
            scoopState,
            channel
          )
        ) {
          return;
        }


        if (action === "plus") {

          scoopState[channel] =
            Math.min(
              scoopState[channel] + 1,
              50
            );

        }


        if (action === "minus") {

          scoopState[channel] =
            Math.max(
              scoopState[channel] - 1,
              0
            );

        }


        updateCalculator();

      }
    );

  });


updateCalculator();


/* =========================================================
   IMAGE ERROR DEBUG
========================================================= */

document
  .querySelectorAll("img")
  .forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        console.warn(
          "Imagem não encontrada:",
          image.getAttribute("src")
        );

      }
    );

  });


/* =========================================================
   OPTIONAL IMAGE HOVER FALLBACK
========================================================= */

const planImages =
  document.querySelectorAll(
    ".plan-weight-image img"
  );


planImages.forEach((image) => {

  image.setAttribute(
    "draggable",
    "false"
  );

});


/* =========================================================
   SAFETY
========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "site-ready"
    );

  }
);