import { Download } from "lucide-react"
import { Button } from "../ui/button"
import './index.scss'

export default function CodePanel() {
    return (
        <>
            <div className="header">
                <div className="title">TERRAFORM CODE</div>
                <div className="actions">
                    <button className="actionButton">
                        <span className="downloadIcon">↓</span>
                    </button>
                </div>
            </div>

            <div className="codeContent">
                <pre className="codeBlock">
                    {`resource "aws_vpc" "main" {
      cidr_block = "10.0.0.0/16"
      
      tags = {
        Name = "main"
      }
    }`}
                </pre>

                <pre className="codeBlock">
                    {`resource "aws_subnet" "public" {
      vpc_id = \${aws_vpc.main.id}
      cidr_block = "10.0.1.0/24"
      
      tags = {
        Name = "Public"
      }
    }`}
                </pre>

                <pre className="codeBlock">
                    {`resource "aws_instance" "web" {
      ami = "ami-0c55b159cbfafe1f0"
      instance_type = "t2.micro"
      subnet_id = \${aws_subnet.public.id}
      
      tags = {
        Name = "WebServer"
      }
    }`}
                </pre>
            </div>
        </>
    )
}

