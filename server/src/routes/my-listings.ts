import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Listing from "../models/listing";
import { ListingType } from "../../../shared/types";
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
    body("starRating").notEmpty().withMessage("Star Rating is required"),
    body("adultCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Adult Count is required"),
    body("childCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Child Count is required"),
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

      const imageUrls = await uploadImages(imageFiles);
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

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const listings = await Listing.find({ userId: req.userId });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const listing = await Listing.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(listing);
    console.log(listing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings" });
  }
});

router.put(
  "/:listingId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedListing: ListingType = req.body;
      updatedListing.lastUpdated = new Date();
      const listing = await Listing.findOneAndUpdate(
        {
          _id: req.params.listingId,
          userId: req.userId,
        },
        updatedListing,
        {
          new: true,
        }
      );
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      listing.imageUrls = [
        ...updatedImageUrls,
        ...(updatedListing.imageUrls || []),
      ];
      await listing.save();
      res.status(201).json(listing);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
