---
---

(function() {
  function createBanner(url) {
    var bannerEl = document.createElement('div');
    console.log(url);
    if(url.includes('paynoweatlater.de')){
      url = url.replace("paynoweatlater.de/at/", "bon-bon.de/gutschein/");
    }
    url = url + "?popup";
    bannerEl.classList.add('paynoweatlater-banner');
    bannerEl.innerHTML = [
      '<span class="paynoweatlater-banner__dismiss">×</span>',
      '<div class="paynoweatlater-banner__wrapper">',
        '<img class="paynoweatlater-banner__logo" src="{{ "assets/images/logo.png" | absolute_url }}" alt="BON BON Restaurant Gutschein - Logo" />',
        '<p class="paynoweatlater-banner__text">',
          'Unsere Restaurantgutscheine zum Verschenken oder selbst nutzen findest du auf BON BON',
        '</p>',
        '<a title="Zum Kauf unseres Restaurant Gutscheins auf BON BON" href="', url, '" target="_blank" class="paynoweatlater-banner__button">Zum Gutscheinkauf</a>',
        '<p class="paynoweatlater-banner__subtext">powered by &nbsp;<a title="Infos zum BON BON - Gutscheinsystem für Restaurants, Bars und Cafés aller Art" href="https://gutscheinsystem.bon-bon.de/" target="_blank" class="paynoweatlater-banner__sublink">© BON BON - Das Gutscheinsystem für die Gastronomie</a></p>',
      '</div>'
    ].join('');

    var dismissBtn = bannerEl.querySelector('.paynoweatlater-banner__dismiss');
    dismissBtn.addEventListener('click', hideBanner);

    return bannerEl;
  }

  function hideBanner(e) {
    var bannerEls = document.getElementsByClassName('paynoweatlater-banner');

    Array.prototype.forEach.call(bannerEls, function(banner) {
      banner.classList.add('paynoweatlater-banner--fade');
    });

    e.preventDefault();
  };

  function injectStylesheet() {
    var stylesheet = document.createElement('link');
    stylesheet.type = 'text/css';
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '{{ "assets/css/banner.css" | absolute_url }}';

    document.head.appendChild(stylesheet);
  }

  function isAllowedURL(url) {
    isPayNowEatLaterURL = /^https:\/\/www\.paynoweatlater\.de[^ "]+$/;
    isBonBonURL = /^https:\/\/www\.bon-bon\.de[^ "]+$/;

    return isPayNowEatLaterURL.test(url) || isBonBonURL.test(url);
  }

  var p = window.paynoweatlater = window.paynoweatlater || {};

  if (!p.invoked) {
    p.invoked = true;

    p.appendBannerEl = function(url) {
      var bannerEl = createBanner(url);

      document.body.appendChild(bannerEl);
    };

    p.addBanner = function(url) {
      if (isAllowedURL(url))  {
        injectStylesheet();

        document.addEventListener('DOMContentLoaded', function() {
          p.appendBannerEl(url);
        });
      } else {
         console.log('URL ist nicht erlaubt.');
      }
    };
  }
})();
