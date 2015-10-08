var dpr, rem, scale,
    docEl = document.documentElement,
    fontEl = document.createElement('style'),
    metaEl = document.querySelector('meta[name="viewport"]'),
    dpr = window.devicePixelRatio || 1;

    rem = docEl.clientWidth * dpr / 10;
    scale = 1 / dpr;

metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no');
docEl.setAttribute('data-dpr', dpr);
docEl.firstElementChild.appendChild(fontEl);
docEl.firstElementChild.appendChild(metaEl);
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';