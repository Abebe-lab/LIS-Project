import UglifyJS from "uglify-js";
import fs from "fs";
//test 1
const code = fs.readFileSync("./server.js", "utf-8");
const result = UglifyJS.minify(code,{ mangle: { toplevel: true } });

if (result.error) {
    console.log("Error during minification:", result.error);
} else {
    // Write the minified code to server.min.js
    fs.writeFile("server.min.js", result.code, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File was successfully saved as server.min.js");
        }
    });
}
//test 2
const authCode = await fs.readFileSync("./src/shared/security/authJwt.js", "utf-8");
console.log(authCode);
const resultAuth = await UglifyJS.minify(authCode,{ mangle: { toplevel: true } });

if (resultAuth.error) {
    console.log("Error during minification:", resultAuth.error);
} else {
    // Write the minified code to server.min.js
    fs.writeFile("./src/shared/security/authJwt.min.js", resultAuth.code, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File was successfully saved as authJwt.min.js");
        }
    });
}
