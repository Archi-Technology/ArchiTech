import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";

// Multer Configuration
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "uploads")); // Directory to save files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueSuffix); // Unique filename
    },
  });
  
  export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only JPEG, PNG, and JPG files are allowed"));
      }
      cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  });

 export const uploadMiddleware = upload.single("file");
  