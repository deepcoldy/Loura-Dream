/*
* @Author: hanjiyun
* @Date:   2018-07-21 13:54:44
* @Last Modified by:   hanjiyun
* @Last Modified time: 2018-07-21 16:30:49
*/

var clientWidth;
var clientHeight;

;(function (doc, win) {
  var docEl = win.document.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var refreshRem = function () {
    clientWidth = win.innerWidth
                      || doc.documentElement.clientWidth
                      || doc.body.clientWidth;

    clientHeight = win.innerHeight
                  || doc.documentElement.clientHeight
                  || doc.body.clientHeight;

    if (!clientWidth) return;
    var fz;
    var width = clientWidth;
    fz = 18 * width / 375;
    docEl.style.fontSize = fz + 'px';
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener('DOMContentLoaded', refreshRem, false);
  refreshRem();

  console.log('rem!!!')

})(document, window);
