---
---

(function() {
  function createBanner(name) {
    var bannerEl = document.createElement('div');

    bannerEl.classList.add('paynoweatlater-banner');
    bannerEl.innerHTML = [
      '<span class="paynoweatlater-banner__dismiss">×</span>',
      '<div class="paynoweatlater-banner__wrapper">',
        '<img class="paynoweatlater-banner__logo" src="{{ "assets/images/logo.png" | absolute_url }}" alt="#PayNowEatLater - Logo" />',
        '<p class="paynoweatlater-banner__text">',
          'Kaufe jetzt einen Gutschein bei #PayNowEatLater und hilf uns dabei die Krise zu überstehen.',
        '</p>',
        '<a href="https://www.paynoweatlater.de/at/', name, '/" target="_blank" class="paynoweatlater-banner__button">Zum Gutscheinkauf</a>',
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

  var p = window.paynoweatlater = window.paynoweatlater || {};

  if (!p.invoked) {
    p.invoked = true;

    p.appendBannerEl = function(name) {
      var bannerEl = createBanner(name);

      document.body.appendChild(bannerEl);
    };

    p.addBanner = function(name) {
      injectStylesheet();

      document.addEventListener('DOMContentLoaded', function() {
        p.appendBannerEl(name);
      });
    };
  }
})();
