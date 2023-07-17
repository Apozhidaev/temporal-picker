const fs = require("fs");
const esbuild = require("esbuild");

module.exports.buildCss = (root) => {
  const bundle = `${root}/__bundle.css`;

  esbuild.buildSync({
    entryPoints: [`${root}/index.css`],
    outfile: bundle,
    bundle: true,
    minify: true,
  });

  const css = fs.readFileSync(bundle, "utf8").trim();

  fs.writeFileSync(`${root}/styles.ts`, `export const styles = \`${css}\`;`);

  fs.unlinkSync(bundle);
};
