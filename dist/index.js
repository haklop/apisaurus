"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = 4040;
app_1.default.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
//# sourceMappingURL=index.js.map