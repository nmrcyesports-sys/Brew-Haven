const fs = require('fs');
let loginCode = fs.readFileSync('src/pages/Login.tsx', 'utf8');
if (!loginCode.includes('declare global')) {
  loginCode = loginCode.replace(/import \{ doc, setDoc, getDoc \} from 'firebase\/firestore';/,
    `import { doc, setDoc, getDoc } from 'firebase/firestore';\n\ndeclare global {\n  interface Window {\n    recaptchaVerifier: any;\n  }\n}\n`);
  fs.writeFileSync('src/pages/Login.tsx', loginCode);
}
