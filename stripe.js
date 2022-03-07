const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function postCharge(req, res) {
  try {
    const { amount, source, receipt_email } = req.body;
    const charge = stripe.charges.create({
      amount,
      source,
      receipt_email,
      currency: "inr",
    });
    if (!charge) {
      throw new Error("charge unsuccessfull");
    } else {
      res.status(200).json({ charge, message: "charge successfull" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = postCharge;
