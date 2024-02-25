const express = require("express");
const get_webhook_data = require("../middlewares/get_webhook_data");
const create_pdf_with_signature = require("../utils/create_pdf_with_signature");
const post_pdf_to_contact = require("../utils/post_pdf_to_contact");
const router = express.Router();

// POST endpoint handler
router.post("/", async (request, response) => {
  try {
    get_webhook_data(request, response);
    await create_pdf_with_signature(request, response);
    await post_pdf_to_contact(request, response);
  } catch (error) {
    console.error("Error handling POST request:", error);
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;
