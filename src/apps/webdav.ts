import Test from "./test.vue";

function main(system: any, ivue: any) {
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
          path: "/C",
        },
      },
    },
    true
  );
}
console.log(main);
