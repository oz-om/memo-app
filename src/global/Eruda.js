const mode = process.env.VITE_MODE;
if (mode == "development") {
  import("eruda").then((module) => {
    module.default.init({
      tool: ["console", "elements", "snippets", "network", "resources", "sources"],
      defaults: {
        displaySize: 50,
        transparency: 0.9,
        theme: "Monokai Pro",
      },
    });
  });
}

// eruda.show();
