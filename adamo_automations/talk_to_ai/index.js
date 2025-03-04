require("dotenv").config();
const express = require("express");
const twilio = require("twilio");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // ✅ For JSON requests (not needed for Twilio)
app.use(express.urlencoded({ extended: true })); // ✅ Needed to parse Twilio webhook form data

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET,
  TWILIO_TWIML_SID, // 🔥 You need to set this in your .env
} = process.env;

app.get("/get-token", (req, res) => {
  const AccessToken = twilio.jwt.AccessToken;
  const VoiceGrant = AccessToken.VoiceGrant;

  const identity = "browser_user"; // 👈 A unique identity for each caller

  const token = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET,
    {
      identity: identity,
    }
  );

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: TWILIO_TWIML_SID, // 👈 This allows outgoing calls!
  });

  token.addGrant(voiceGrant);

  res.json({ token: token.toJwt(), identity });
});

// 🎯 Handle Twilio Webhook for Outgoing Calls
app.post("/twiml", (req, res) => {
  console.log("Twilio Webhook Received:", req.body); // Debugging log

  const twiml = new twilio.twiml.VoiceResponse();

  // If call is from WebRTC, forward to GHL number
  if (req.body.From && req.body.From.startsWith("client:")) {
    console.log("Incoming WebRTC call from:", req.body.From);
    twiml.dial({ callerId: "+18564602689" }, "+8801742677273"); // 🔥 Your GHL number
  } else {
    console.log("Invalid call source:", req.body.From);
    return res.status(400).send("Invalid call source");
  }

  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
