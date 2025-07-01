
import { CircularProgress } from "@mui/material";
import { useTerraform } from "../../contexts/terraformContext";
import './index.scss';
"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Code, Copy, Download, X } from "lucide-react"

// const sampleTerraformCode = `# Configure the AWS Provider
// terraform {
//   required_providers {
//     aws = {
//       source  = "hashicorp/aws"
//       version = "~> 5.0"
//     }
//   }
// }

// provider "aws" {
//   region = "us-west-2"
// }

// # Generate random suffix for unique naming
// resource "random_string" "bucket_suffix" {
//   length  = 8
//   special = false
//   upper   = false
// }

// # Create VPC
// resource "aws_vpc" "main" {
//   cidr_block           = "10.0.0.0/16"
//   enable_dns_hostnames = true
//   enable_dns_support   = true

//   tags = {
//     Name = "main-vpc"
//   }
// }

// # Create Internet Gateway
// resource "aws_internet_gateway" "main" {
//   vpc_id = aws_vpc.main.id

//   tags = {
//     Name = "main-igw"
//   }
// }

// # Create Subnets
// resource "aws_subnet" "public" {
//   vpc_id                  = aws_vpc.main.id
//   cidr_block              = "10.0.1.0/24"
//   availability_zone       = "us-west-2a"
//   map_public_ip_on_launch = true

//   tags = {
//     Name = "public-subnet"
//   }
// }

// resource "aws_subnet" "private" {
//   vpc_id            = aws_vpc.main.id
//   cidr_block        = "10.0.2.0/24"
//   availability_zone = "us-west-2b"

//   tags = {
//     Name = "private-subnet"
//   }
// }

// # Create S3 Buckets
// resource "aws_s3_bucket" "bucket1" {
//   bucket = "my-terraform-bucket1-\${random_string.bucket_suffix.result}"

//   tags = {
//     Name = "bucket1"
//   }
// }

// resource "aws_s3_bucket" "bucket2" {
//   bucket = "my-terraform-bucket2-\${random_string.bucket_suffix.result}"

//   tags = {
//     Name = "bucket2"
//   }
// }

// # Create EC2 Instances
// resource "aws_instance" "vm1" {
//   ami           = "ami-0c02fb55956c7d316"
//   instance_type = "t3.micro"
//   subnet_id     = aws_subnet.public.id

//   tags = {
//     Name = "VM1"
//   }
// }

// resource "aws_instance" "vm2" {
//   ami           = "ami-0c02fb55956c7d316"
//   instance_type = "t3.micro"
//   subnet_id     = aws_subnet.private.id

//   tags = {
//     Name = "VM2"
//   }
// }`

// Syntax highlighting function
const highlightTerraformSyntax = (line: string) => {
  if (line.trim().startsWith("#")) {
    return <span className="syntax-comment">{line}</span>
  }

  if (line.includes("resource") || line.includes("provider") || line.includes("terraform")) {
    const parts = line.split(" ")
    return (
      <span>
        <span className="syntax-keyword">{parts[0]}</span>
        <span className="syntax-default">{line.substring(line.indexOf(" "))}</span>
      </span>
    )
  }

  if (line.includes("=") && !line.trim().startsWith("tags")) {
    const [property, ...valueParts] = line.split("=")
    const value = valueParts.join("=")
    return (
      <span>
        <span className="syntax-property">{property}</span>
        <span className="syntax-default">=</span>
        <span className="syntax-value">{value}</span>
      </span>
    )
  }

  if (line.includes('"')) {
    const parts = line.split('"')
    return (
      <span>
        {parts.map((part, index) =>
          index % 2 === 1 ? (
            <span key={index} className="syntax-string">
              "{part}"
            </span>
          ) : (
            <span key={index} className="syntax-default">
              {part}
            </span>
          ),
        )}
      </span>
    )
  }

  return <span className="syntax-default">{line}</span>
}

export default function TerraformCodePanel() {
  // const [isOpen, setIsOpen] = useState(false)
  // const [isMinimized, setIsMinimized] = useState(false)
  // const [isAnimating, setIsAnimating] = useState(false)
  
  const { terraformCode, isLoading} = useTerraform()

  // const togglePanel = () => {
  //   if (isAnimating) return

  //   setIsAnimating(true)

  //   if (isMinimized) {
  //     setIsMinimized(false)
  //     setIsOpen(true)
  //   } else {
  //     setIsOpen(!isOpen)
  //   }

  //   setTimeout(() => setIsAnimating(false), 300)
  // }

  // const minimizePanel = () => {
  //   if (isAnimating) return

  //   setIsAnimating(true)
  //   setIsOpen(false)
  //   setIsMinimized(true)

  //   setTimeout(() => setIsAnimating(false), 300)
  // }

  // const closePanel = () => {
  //   if (isAnimating) return

  //   setIsAnimating(true)
  //   setIsOpen(false)
  //   setIsMinimized(false)

  //   setTimeout(() => setIsAnimating(false), 300)
  // }


  const copyCode = () => {
    navigator.clipboard.writeText(terraformCode)
  }

  const downloadCode = () => {
    const blob = new Blob([terraformCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "main.tf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="terraform-panel-container">

{/*       
      {!isOpen && !isMinimized && (
        <div className={`floating-toggle ${!isAnimating ? "visible" : ""}`}>
          <button onClick={togglePanel} className="floating-toggle-btn">
            <ChevronLeft className="icon-md" />
            <Code className="icon-md" />
          </button>
        </div>
      )} */}

      {/* Minimized Panel Tab */}
      {/* {isMinimized && (
        <div className={`minimized-tab ${!isAnimating ? "visible" : ""}`}>
          <button onClick={togglePanel} className="minimized-tab-btn">
            <div className="minimized-tab-content">
              <ChevronLeft className="icon-sm" />
              <div className="vertical-text">TERRAFORM</div>
              <Code className="icon-sm" />
            </div>
          </button>
        </div>
      )} */}

      {/* Code Panel */}
      { (
        <div className={`code-panel visible`}>
          {/* Header */}
          <div className="panel-header">
            <div className="header-title">
              <Code className="header-icon" />
              <h2 className="header-text">TERRAFORM CODE</h2>
            </div>
            <div className="header-controls">
              {/* <button onClick={minimizePanel} className="header-btn">
                <ChevronRight className="icon-sm" />
              </button>
              <button onClick={closePanel} className="header-btn">
                <X className="icon-sm" />
              </button> */}
            </div>
          </div>

          {/* Toolbar */}
          <div className="panel-toolbar">
            <div className="toolbar-file">main.tf</div>
            <div className="toolbar-actions">
              <button onClick={copyCode} className="toolbar-btn">
                <Copy className="icon-sm" />
              </button>
              <button onClick={downloadCode} className="toolbar-btn">
                <Download className="icon-sm" />
              </button>
            </div>
          </div>

          {/* Code Content */}
          <div className="code-content">
          {isLoading ?<div className="loading"> <CircularProgress color="inherit" size="6rem" /></div> : <pre className="code-pre">
              <code>
                 
                {terraformCode.split("\n").map((line, index) => (
                  <div key={index} className="code-line">
                    <span className="line-number">{index + 1}</span>
                    <span className="line-content">{highlightTerraformSyntax(line)}</span>
                  </div>
                ))}
              </code>
            </pre>}
            
          </div>

          {/* Status Bar */}
          <div className="status-bar">
            <div className="status-content">
              <span>Terraform v1.6.0</span>
              <span>Lines: {terraformCode.split("\n").length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
