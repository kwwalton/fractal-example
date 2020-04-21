console.log("test");
const jsScripts = {
  example: () =>
    import(
      /* webpackChunkName: "example" */ "../../components/example/example.js"
    ),
  exampleAnother: () =>
    import(
      /* webpackChunkName: "exampleAnother" */ "../../components/example-another/example-another.js"
    ),
};
console.log("loaded");
const attributeName = "data-js";
console.log(document.querySelectorAll(`[${attributeName}]`), "yo");
const itemsOnPage = Array.from(document.querySelectorAll(`[${attributeName}]`));
console.log(itemsOnPage);
itemsOnPage.forEach((item, index, arr) => {
  const webpackChunkName = item.getAttribute(attributeName);
  console.log("processing main js");
  if (jsScripts[webpackChunkName]) {
    jsScripts[webpackChunkName]()
      .then((module) => {
        module.default(item, index, arr.length);
      })
      .catch((err) => console.log(err));
  } else {
    console.error("webpackChunkName:", webpackChunkName, "not found");
  }
});

//
