import express from "express";

const router = express.Router();

router.get("/api/users/signout", (req, res) => {
  console.log("Logging user out!");

  res.json({
    message: "Signed Out"
  });
});

export { router as signOutUserRouter };