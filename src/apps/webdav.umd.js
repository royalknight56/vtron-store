(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };

  const _sfc_main = {};

  function _sfc_render(_ctx, _cache) {
    return "Test"
  }
  const Test = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

  function main(system, ivue) {
    console.log("webdav.js: main()", system, ivue);
    system.addApp(
      {
        name: "computer2",
        icon: "test",
        window: {
          width: 800,
          height: 600,
          center: true,
          title: "computer",
          icon: "myComputerLogoIcon",
          content: Test,
          config: {
            path: "/C"
          }
        }
      },
      true
    );
  }
  console.log(main);

}));
