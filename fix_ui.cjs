const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace mobile navlinks
css = css.replace(/@media\(max-width: 1150px\) \{[\s\S]*?\.navlinks \{[\s\S]*?\}\s*\.navlinks a \{/g, (match) => {
  return `@media(max-width: 1150px) {
  .shell {
    width: calc(100% - 20px);
    margin: 10px;
    border-radius: 25px;
  }
  .nav {
    left: 14px;
    right: 14px;
  }
  .navlinks {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: -260px;
    bottom: 0;
    width: 250px;
    background: #120906;
    z-index: 1000;
    padding: 100px 20px 20px;
    margin: 0;
    border-left: 1px solid rgba(244,229,203,.1);
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .navlinks a {`;
});

css = css.replace(/@media\(max-width: 1150px\) \{\s*\.navlinks\.open \{[\s\S]*?\}\s*\}/g, `@media(max-width: 1150px) {
  .navlinks.open {
    visibility: visible;
    opacity: 1;
    right: 0;
    box-shadow: -15px 0 40px rgba(0,0,0,0.8);
  }
}`);

// Fix faded Specialty Coffee
css = css.replace(/\.stat strong \{[\s\S]*?\}/g, `.stat strong {\n  color: #ffffff;\n  font-size: 13px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  display: block;\n  text-shadow: 0 1px 3px rgba(0,0,0,0.8);\n}`);
css = css.replace(/\.stat span span \{[\s\S]*?\}/g, `.stat span span {\n  font-size: 12px;\n  font-weight: 500;\n  color: #e8d8c8;\n}`);
css = css.replace(/background: rgba\(15,8,5,\.72\);/g, `background: rgba(10,5,3,.85);`);

fs.writeFileSync('src/index.css', css);
