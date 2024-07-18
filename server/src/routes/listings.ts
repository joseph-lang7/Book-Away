import express, { Request, Response } from "express";
import Listing from "../models/listing";
import { BookingType, ListingSearchResponse } from "../../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const listings = await Listing.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const total = await Listing.countDocuments(query);

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

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.amenities) {
    constructedQuery.amenities = {
      $all: Array.isArray(queryParams.amenities)
        ? queryParams.amenities
        : [queryParams.amenities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Listing ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id.toString();
    try {
      const listing = await Listing.findById(id);
      res.json(listing);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching listing" });
    }
  }
);

router.post(
  "/:listingId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    const { numberOfNights } = req.body;
    const listingId = req.params.listingId;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(400).json({ message: "Listing not found" });
    }

    const totalCost = listing.pricePerNight * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "usd",
      metadata: {
        listingId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.send(response);
  }
);

router.post(
  "/:listingId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const paymentIntentId = req.body.paymentIntentId;
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId as string
      );
      if (!paymentIntent) {
        return res.status(400).json({ message: "payment intent not found" });
      }
      if (
        paymentIntent.metadata.listingId !== req.params.listingId ||
        paymentIntent.metadata.userId !== req.userId
      ) {
        return res.status(400).json({ message: "payment intent mismatch" });
      }

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
        });
      }

      const newBooking: BookingType = {
        ...req.body,
        userId: req.userId,
      };

      const listing = await Listing.findOneAndUpdate(
        { _id: req.params.listingId },
        {
          $push: { bookings: newBooking },
        }
      );
      if (!listing) {
        return res.status(400).json({ message: "listing not found" });
      }
      await listing.save();
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.delete(
  "/:listingId",
  verifyToken,
  async (req: Request, res: Response) => {
    const listingId = req.params.listingId;
    try {
      const listing = await Listing.findOneAndDelete({
        _id: listingId,
      });
      if (!listing) {
        return res.status(400).json({ message: "listing not found" });
      }
      res
        .status(200)
        .json({ message: "Listing deleted successfully", listing });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
export default router;
