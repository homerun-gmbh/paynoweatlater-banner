---
---

(function() {
  function createBanner(url) {
    var bannerEl = document.createElement('div');
    if(url.includes('paynoweatlater.de')){
      url = url.replace("paynoweatlater.de/at/", "bon-bon.de/gutschein/");
    }
    bannerEl.classList.add('paynoweatlater-banner');
    bannerEl.innerHTML = [
      '<span class="paynoweatlater-banner__dismiss">×</span>',
      '<div class="paynoweatlater-banner__wrapper">',
        '<img class="paynoweatlater-banner__logo" src="{{ "assets/images/logo.png" | absolute_url }}" alt="#PayNowEatLater - Logo" />',
        '<p class="paynoweatlater-banner__text">',
          'Unsere Restaurantgutscheine zum Verschenken oder selbst nutzen findest du auf ',
        '</p>',
        '<a href="', url, '" target="_blank" class="paynoweatlater-banner__button">Zum Gutscheinkauf</a>',
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

    return isPayNowEatLaterURL.test(url);
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
      }
    };
  }
})();
