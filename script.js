// スマホ用の固定ボタン：ヒーロー内の価格ボックスが見えなくなったら表示する
(function () {
  var bar = document.getElementById('stickyCta');
  var target = document.querySelector('.price-box');
  var final = document.querySelector('.final');
  if (!bar || !target || !('IntersectionObserver' in window)) return;

  var heroHidden = false, finalVisible = false;
  function update() {
    var show = heroHidden && !finalVisible;
    bar.classList.toggle('show', show);
    bar.setAttribute('aria-hidden', show ? 'false' : 'true');
    var a = bar.querySelector('a');
    if (a) a.tabIndex = show ? 0 : -1;
  }
  new IntersectionObserver(function (e) {
    heroHidden = !e[0].isIntersecting && e[0].boundingClientRect.top < 0;
    update();
  }).observe(target);
  if (final) {
    new IntersectionObserver(function (e) {
      finalVisible = e[0].isIntersecting;
      update();
    }).observe(final);
  }
})();
