import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Listing, { ListingType } from "../models/listing";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("amenities")
      .notEmpty()
      .isArray()
      .withMessage("Amenities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newListing: ListingType = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      newListing.imageUrls = imageUrls;
      newListing.lastUpdated = new Date();
      newListing.userId = req.userId;

      const listing = new Listing(newListing);
      await listing.save();

      return res.status(201).send(listing);
    } catch (error) {
      console.error("Error creating listing:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
export default router;
