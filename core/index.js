"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const Button = styled_1.default.a `
  color: hotpink;
`;
const Root = () => {
    return (react_1.default.createElement("div", { css: {
            backgroundColor: "hotpink",
            "&:hover": {
                color: "lightgreen",
            },
        } }, "This has a hotpink background."));
};
exports.default = Root;
//# sourceMappingURL=index.js.map