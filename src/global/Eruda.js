import eruda from "eruda";
const mode = process.env.VITE_MODE;

if (mode == "development") {
  eruda.init({
    tool: ["console", "elements", "snippets", "network", "resources", "sources"],
    defaults: {
      displaySize: 50,
      transparency: 0.9,
      theme: "Monokai Pro",
    },
  });
}

// eruda.show();
