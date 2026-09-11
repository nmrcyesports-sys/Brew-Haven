const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

const newCSS = `

.menu-toggle {
  display: none;
  width: 42px;
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  z-index: 1002;
}

.menu-toggle span {
  width: 17px;
  height: 1.5px;
  background: var(--cream);
  transition: .3s ease;
}

/* Animated X */
.menu-toggle.active span:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}


/* MOBILE MENU */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(8,3,2,.72);
  backdrop-filter: blur(18px);
  opacity: 0;
  visibility: hidden;
  transition: .35s ease;
}

.mobile-menu-overlay.open {
  opacity: 1;
  visibility: visible;
}

.mobile-menu-inner {
  position: absolute;
  top: 12px;
  right: 12px;
  left: 12px;

  padding: 24px;

  border: 1px solid var(--line);
  border-radius: 28px;

  background:
    radial-gradient(
      circle at 80% 0%,
      rgba(214,164,93,.15),
      transparent 35%
    ),
    rgba(22,11,7,.96);

  box-shadow: 0 30px 100px rgba(0,0,0,.7);

  transform: translateY(-25px) scale(.97);
  transition: .4s cubic-bezier(.2,.8,.2,1);
}

.mobile-menu-overlay.open .mobile-menu-inner {
  transform: translateY(0) scale(1);
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--line);
}

.mobile-title {
  font-family: "Playfair Display", serif;
  font-size: 18px;
  letter-spacing: 2px;
  color: var(--cream);
}

.mobile-menu-header .menuClose {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: rgba(255,255,255,.04);
  color: var(--cream);
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.mobile-nav a {
  font-family: "Playfair Display", serif;
  font-size: 31px;
  padding: 12px 0;
  color: #cbb9a3;
  transition: .25s ease;
  text-decoration: none;
}

.mobile-nav a:hover {
  color: var(--cream);
  padding-left: 8px;
}

.mobile-book-btn {
  width: 100%;
  border: 0;
  border-radius: 30px;
  padding: 15px 20px;

  background: linear-gradient(
    135deg,
    #D6A45D,
    #b28240
  );

  color: #120906;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.mobile-book-btn span {
  font-size: 20px;
}
`;

code = code + newCSS;

// Let's modify the old media query so that the new menu toggle is displayed
code = code.replace(/\.mobile-menu \{\s*display: grid;\s*\}/, '.menu-toggle {\n    display: flex;\n  }');
code = code.replace(/\.navlinks \{\s*display: flex;\s*flex-direction: column;[\s\S]*?transition: all 0\.5s cubic-bezier\(0\.22, 1, 0\.36, 1\);\s*\}/, '.navlinks {\n    display: none;\n  }');
code = code.replace(/\.navlinks a \{\s*padding: 15px 0;\s*width: 100%;\s*font-size: 16px;\s*\}/, '');


fs.writeFileSync('src/index.css', code);
