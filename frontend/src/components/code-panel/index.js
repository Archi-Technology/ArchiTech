import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './index.scss';
export default function CodePanel() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "header", children: [_jsx("div", { className: "title", children: "TERRAFORM CODE" }), _jsx("div", { className: "actions", children: _jsx("button", { className: "actionButton", children: _jsx("span", { className: "downloadIcon", children: "\u2193" }) }) })] }), _jsxs("div", { className: "codeContent", children: [_jsx("pre", { className: "codeBlock", children: `resource "aws_vpc" "main" {
      cidr_block = "10.0.0.0/16"
      
      tags = {
        Name = "main"
      }
    }` }), _jsx("pre", { className: "codeBlock", children: `resource "aws_subnet" "public" {
      vpc_id = \${aws_vpc.main.id}
      cidr_block = "10.0.1.0/24"
      
      tags = {
        Name = "Public"
      }
    }` }), _jsx("pre", { className: "codeBlock", children: `resource "aws_instance" "web" {
      ami = "ami-0c55b159cbfafe1f0"
      instance_type = "t2.micro"
      subnet_id = \${aws_subnet.public.id}
      
      tags = {
        Name = "WebServer"
      }
    }` })] })] }));
}
//# sourceMappingURL=index.js.map