const plugin = require("tailwindcss/plugin");

// Plugin to generate tailwind components from the buttons, links, and headings keys in tailwind.config.cjs
// Components will be available as tailwind class ex: <button className="Button Button--primary">
function styleguidePlugin() {
  return plugin(({ addComponents, theme }) => {
    const components = Object.assign(
      {},
      { ".Button": JSON.parse(JSON.stringify(theme("buttons") || {})) }
    );
    delete components[".Button"].variants;
    for (const [variant, styles] of Object.entries(theme("buttons.variants"))) {
      components[`.Button--${variant}`] = styles;
    }

    components[".Link"] = JSON.parse(JSON.stringify(theme("links") || {}));
    delete components[".Link"].variants;
    for (const [variant, styles] of Object.entries(theme("links.variants"))) {
      components[`.Link--${variant}`] = styles;
    }

    components[".Heading"] = JSON.parse(
      JSON.stringify(theme("headings") || {})
    );
    delete components[".Heading"].variants;
    for (const [variant, styles] of Object.entries(
      theme("headings.variants")
    )) {
      components[`.Heading--${variant}`] = styles;
    }

    addComponents(components);
  });
}

module.exports = {
  styleguidePlugin,
};
