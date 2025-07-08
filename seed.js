const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Load all models
const User = require('./model/user');
const Review = require('./model/reviews');
const Trainer = require('./model/trainer');
const Gigs = require('./model/gigs');
const Consumer = require('./model/consumer');
const Payment = require('./model/payment');
const ResetToken = require('./model/resetTokens');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB");

    // 1. Create a test user
    const user = await User.create({
      username: "rahul_sharma",
      email: "rahul.sharma@example.com",
      password: "rahul123",
      provider: "local",
      profile: "https://randomuser.me/api/portraits/men/32.jpg",
      isTrainer: false,
      Tags: ["beginner", "weight-loss"]
    });

    // 2. Create a trainer (trainder)
    const trainer = await Trainer.create({
      email: "meena.fitnesscoach@example.com",
      username: "meenakshi_fit",
      experiance: "7 years",
      rating: 4.7,
      NumberRates: 34,
      gender: "female",
      speslity: "Yoga and Weight Management",
      achivement: "Certified Yoga Trainer, 3x State Award Winner",
      phone: 9876543210,
      Gigs: [],
      medical: "Fit and healthy",
      TopReviewer: [],
    });

    // 3. Create a review
    const review = await Review.create({
      text: "Meenakshi ma'am is super supportive and disciplined. Highly recommend!",
      Rating: 5,
      NumberRates: 1,
      Tags: { friendly: true, experienced: true },
      Author: user._id,
    });

    // 4. Create a gig by the trainer
    const gig = await Gigs.create({
      Rating: 4.8,
      Name: "One Month Yoga Transformation Plan",
      NumberRates: 34,
      Tags: ["yoga", "stress-relief", "flexibility"],
      Images: ["https://images.unsplash.com/photo-1588776814546-ec7e8e3d6e8c"],
      price: 2500,
      discription: "A 30-day immersive yoga course focused on flexibility, mental peace, and weight loss.",
      Trainer: trainer._id,
      cousumer: [user._id]
    });

    // Update trainer's gigs
    trainer.Gigs.push(gig._id);
    await trainer.save();

    // 5. Create a consumer entry
    const consumer = await Consumer.create({
      gigs: [gig._id],
      Tags: ["stress-relief", "morning-class"]
    });

    // 6. Update user with gig too (optional)
    user.gigs.push(gig._id);
    await user.save();

    // 7. Create a mock payment record
    const payment = await Payment.create({
      razorpay_order_id: "order_LkF9v8UuEzFz1Y",
      razorpay_payment_id: "pay_LkF9v8EZm1z1Fq",
      razorpay_signature: "sig_123456abcdef",
      user: user._id
    });

    // 8. Create a reset token
    const resetToken = await ResetToken.create({
      token: "reset-token-sample-9876543210",
      email: user.email
    });

    console.log("\n🎉 Data seeded successfully:");
    console.log("👤 User ID:", user._id);
    console.log("🏋️ Trainer ID:", trainer._id);
    console.log("⭐ Review ID:", review._id);
    console.log("🎯 Gig ID:", gig._id);
    console.log("🛒 Consumer ID:", consumer._id);
    console.log("💰 Payment ID:", payment._id);
    console.log("🔑 Reset Token ID:", resetToken._id);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
