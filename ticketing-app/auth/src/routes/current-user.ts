import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  console.log("Fetching current user");

  res.json({
    message: "Hello Current User!"
  });
});

export { router as currentUserRouter };