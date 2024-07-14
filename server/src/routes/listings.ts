import express, { Request, Response } from "express";
import Listing from "../models/listing";
import { ListingSearchResponse } from "../../../shared/types";
const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const listings = await Listing.find().skip(skip).limit(pageSize);
    const total = await Listing.countDocuments();

    const response: ListingSearchResponse = {
      data: listings,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong");
  }
});

export default router;
