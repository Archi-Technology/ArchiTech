"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CodePanel;
const jsx_runtime_1 = require("react/jsx-runtime");
require("./index.scss");
function CodePanel() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "header", children: [(0, jsx_runtime_1.jsx)("div", { className: "title", children: "TERRAFORM CODE" }), (0, jsx_runtime_1.jsx)("div", { className: "actions", children: (0, jsx_runtime_1.jsx)("button", { className: "actionButton", children: (0, jsx_runtime_1.jsx)("span", { className: "downloadIcon", children: "\u2193" }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "codeContent", children: [(0, jsx_runtime_1.jsx)("pre", { className: "codeBlock", children: `resource "aws_vpc" "main" {
      cidr_block = "10.0.0.0/16"
      
      tags = {
        Name = "main"
      }
    }` }), (0, jsx_runtime_1.jsx)("pre", { className: "codeBlock", children: `resource "aws_subnet" "public" {
      vpc_id = \${aws_vpc.main.id}
      cidr_block = "10.0.1.0/24"
      
      tags = {
        Name = "Public"
      }
    }` }), (0, jsx_runtime_1.jsx)("pre", { className: "codeBlock", children: `resource "aws_instance" "web" {
      ami = "ami-0c55b159cbfafe1f0"
      instance_type = "t2.micro"
      subnet_id = \${aws_subnet.public.id}
      
      tags = {
        Name = "WebServer"
      }
    }` })] })] }));
}
//# sourceMappingURL=index.js.map