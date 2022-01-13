var render = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    'div',
    { staticClass: 'component1-wrap' },
    [
      _c('TestCom'),
      _vm._v(' '),
      _c('h4', { staticClass: 'h' }, [_vm._v(_vm._s(_vm.title))]),
      _vm._v(' '),
      _c('img', { attrs: { src: require('./some.jpg') } }),
      _vm._v(' '),
      _c('div', { staticClass: 'some-bg' }),
    ],
    1
  );
};
var staticRenderFns = [];
render._withStripped = true;

export { render, staticRenderFns };
