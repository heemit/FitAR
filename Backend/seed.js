const mongoose = require('mongoose');
const Product = require('./models/Product'); // Adjust the path as necessary

const products = [
  // Flexibility & Recovery
  {
    name: "Foam Rollers", 
    price: 759, 
    description: "Istara Foam Roller for Back Pain, Exercise and Fitness | High-Density Foam Roller for Deep Tissue Massage, Relief from Sore Muscles Pain, Pre & Post Exercise Fitness Workout Sessions (33 cm x 15 cm)", 
    imageUrl: "https://m.media-amazon.com/images/I/5141INyrZZL._SY879_.jpg", 
    category: "Flexibility & Recovery", 
    subcategory: "Foam Rollers"
  },
  {
    name: "Resistance Bands", 
    price: 499, 
    description: "PRO365 11 in 1 Resistance Band Kit for Home Exercises, Stretching, Toning Tube Kit with Foam Handles, Door Anchor (Ankle Strap and Carrying Bag Included)", 
    imageUrl: "https://m.media-amazon.com/images/I/61gBKyIWuGL._SX679_.jpg", 
    category: "Flexibility & Recovery", 
    subcategory: "Resistance Bands"
  },
  {
    name: "Yoga Mats", 
    price: 1599, 
    description: "Boldfit Yoga Mat for Women and Men with Cover Bag TPE Material Extra Thick Exercise Yoga Mat for Men for Workout, Yoga, Fitness, Exercise Mat Anti Slip Mat, Yoga Mat 6mm Gym Mat Dark-Light Blue", 
    imageUrl: "https://m.media-amazon.com/images/I/817n+-aD8uL._SX679_.jpg", 
    category: "Flexibility & Recovery", 
    subcategory: "Yoga Mats"
  },
  {
    name: "Massage Guns", 
    price: 3997, 
    description: "Caresmith Charge Sport Professional Massage Gun | Ultra Powerful Deep Tissue True Percussion Massager Machine for Pain Relief for Men and Women | 50 w BLDC Motor Massager Gun", 
    imageUrl: "https://m.media-amazon.com/images/I/51CiPBKjJPL._SX679_.jpg", 
    category: "Flexibility & Recovery", 
    subcategory: "Massage Guns"
  },

  // Bodyweight
  {
    name: "Pull-up Bars", 
    price: 6799, 
    description: "Kobo Multifunctional Pull Up Bar Chin Up bar Dip Station for Indoor Home Gym Workout, Power Tower Set Training Equipment Fitness Dip Stand (Imported)", 
    imageUrl: "https://media.sketchfab.com/models/f5b6dc0cd95d4430886ece65096d6f11/thumbnails/e96d01bccd3a44bba7868a1459308b88/8972cd8803244defb2b25be9edb9865e.jpeg", 
    category: "Bodyweight", 
    subcategory: "Pull-up Bars"
  },
  {
    name: "Dip Stations", 
    price: 6299, 
    description: "Kobo Adjustable Home Gym Weight Bench Press Exercise Equipment Seat Squat Stand Dip", 
    imageUrl: "https://media.sketchfab.com/models/416ca933620c4561932aedc2d2c08c0f/thumbnails/bc6b65b41a4544a1ad60ea943b5ef9c4/336de7ba70a340d9b21cc1a756cd6d0b.jpeg", 
    category: "Bodyweight", 
    subcategory: "Dip Stations"
  },
  {
    name: "Push-up Bars", 
    price: 610, 
    description: "Boldfit Push Up Bar Pushup Home Gym Equipment for Men & Women for Training, Exercise Push up Stand Gym Accessories for Men & Women in Home Use for Chest, Pushup Anti-Slip Push Ups Stand Multicolor", 
    imageUrl: "https://media.sketchfab.com/models/7e36b1a027cd46f6a530d0ef4f4b8a17/thumbnails/c775bd33d5d948b4b2185a2249023278/da9f9463b99a42e882a2f9804e46a3c1.jpeg", 
    category: "Bodyweight", 
    subcategory: "Push-up Bars"
  },
  {
    name: "Ab Wheels", 
    price: 569, 
    description: "Boldfit Abs Roller for Men & Women Premium Ab Wheel Roller Stomach Abs Roller for Home Workout, Gym Ab Roller for Men Abs Workout Equipment for Abdominal Ab Roller Home Exercise Equipment", 
    imageUrl: "https://media.sketchfab.com/models/41eed5f072034a8481786fe113dfa772/thumbnails/b88e99e852d84836ad8e9da528bcda7a/13c22d1084e34ff4a60902cf3e1a23de.jpeg", 
    category: "Bodyweight", 
    subcategory: "Ab Wheels"
  },

  // Cardio
  {
    name: "Treadmills", 
    price: 26998, 
    description: "MAXPRO FORCE PRO 4.5 HP Peak DC Motorized Multifunction Folding Treadmill for home use with Massager,Max.Speed 14km/hr,Max.User Weight 110kgs,Fit Show App Support,Running Machine for Home gym(PTM405M)", 
    imageUrl: "https://media.sketchfab.com/models/03e4ff99ecc24e5f8ea49d4e8df876e8/thumbnails/204c6e92309a40639f22410f15962054/b926e16aa91c4c00a58fe39b7992fbf6.jpeg", 
    category: "Cardio", 
    subcategory: "Treadmills"
  },
  {
    name: "Stationary Bikes", 
    price: 10499, 
    description: "Lifelong LLF45 Fit Pro Spin Fitness Bike with 6Kg Flywheel, Adjustable Resistance, LCD Monitor and Heart Rate Sensor for Fitness at Home; Home Workouts (1 Year Warranty, Max Weight: 120 kg)", 
    imageUrl: "https://media.sketchfab.com/models/c6c7b485d4a6437999502c1b477617c5/thumbnails/7802a5ea36dc40a4af79ad4b2d6e4a40/cf14c18d051143af98e4abe4b824b5c3.jpeg", 
    category: "Cardio", 
    subcategory: "Stationary Bikes"
  },
  {
    name: "Stair Climbers", 
    price: 17590, 
    description: "PowerMax Fitness STC-01 Professional Fitness Stair Climber", 
    imageUrl: "https://m.media-amazon.com/images/I/61vFjevMSQL._SX679_.jpg", 
    category: "Cardio", 
    subcategory: "Stair Climbers"
  },
  {
    name: "Boxing Machines", 
    price: 3999, 
    description: "Drumstone Wall-Mounted Smart Bluetooth Music Boxing Trainer - Touchscreen Display, Home & Gym Punching Machine", 
    imageUrl: "https://m.media-amazon.com/images/I/71acU0MipIL._SX679_.jpg", 
    category: "Cardio", 
    subcategory: "Boxing Machines"
  },

  // Strength
  {
    name: "Dumbbells", 
    price: 849, 
    description: "Amazon Brand - Symactive PVC Shell Fixed Dumbbells for Home Gym", 
    imageUrl: "https://images.free3d.com/imgd/l47229-dumbbell-91013.jpg", 
    category: "Strength", 
    subcategory: "Dumbbells"
  },
  {
    name: "Kettlebells", 
    price: 1489, 
    description: "Amazon Brand - Symactive Neoprene Coated Solid Kettlebell for Gym Exercises, 8 Kg", 
    imageUrl: "https://media.sketchfab.com/models/801a68fa3ed449258bac6ee023446c15/thumbnails/6af051b75274427d9e3c203e7325a820/1fd0a6c0696046da93fa1d15a9064924.jpeg", 
    category: "Strength", 
    subcategory: "Kettlebells"
  },
  {
    name: "Barbells & Weight Plates", 
    price: 9369, 
    description: "LEEWAY Rubber Bumper Plates with Olympic Barbell, (30kg Set)| Olympic Weightlifting Gym Rubber Bumper Weight Plates| Olympic Barbell Weight Plate|", 
    imageUrl: "https://media.sketchfab.com/models/6d007a29c5a5445a8f0712253095e2cc/thumbnails/f7306550a97d4df7866ab0cf1bdf6771/c642824e68b7476f885cd1df1c7ff489.jpeg", 
    category: "Strength", 
    subcategory: "Barbells & Weight Plates"
  },
  {
    name: "Power Racks", 
    price: 9289, 
    description: "HASHTAG FITNESS Home gym adjustable power squat rack, power cages for pull ups and training purpose, strength training equipments, Squat stand for home gym purpose (POWER PRO 500T)", 
    imageUrl: "https://m.media-amazon.com/images/I/616sLrLZsGL._SX679_.jpg", 
    category: "Strength", 
    subcategory: "Power Racks"
  },
  
  // Functional Training
  {
    name: "Battle Ropes", 
    price: 4399, 
    description: "FirstFit Premium Workout Battle Rope for Core Strength Training, Poly Dacron Heavy Exercise Training Rope for Improve Strength Building Muscle - 50 Feet", 
    imageUrl: "https://m.media-amazon.com/images/I/51O120Xu5UL._SX300_SY300_QL70_FMwebp_.jpg", 
    category: "Functional Training", 
    subcategory: "Battle Ropes"
  },
  {
    name: "Medicine Balls", 
    price: 1499, 
    description: "Amazon basics Medicine Ball | Exercise Ball for Upper & Lower Body Exercises", 
    imageUrl: "https://media.sketchfab.com/models/7779eade266147c7a1468cce204de827/thumbnails/1d81241df5e7498d893362196d77d279/883cc1ebe4d24a2ea8d2ad88296a41d8.jpeg", 
    category: "Functional Training", 
    subcategory: "Medicine Balls"
  },
  {
    name: "Suspension Trainers (TRX)", 
    price: 1899, 
    description: "FreshDcart Unisex Suspension Body Trainer Exercise Kit Band - Portable Home Gym Workout Set with Door Anchor and Wall Mount (Multi-Colour)", 
    imageUrl: "https://m.media-amazon.com/images/I/71hrm+Zfm+L._SX679_.jpg", 
    category: "Functional Training", 
    subcategory: "Suspension Trainers"
  },
  {
    name: "Plyometric Boxes", 
    price: 8258, 
    description: "Leeway 3 in 1 20 Inch 24 Inch 30 Inch Foam Plyometric jump Box for Jumping Exercise| Plyo Box, High jump stand, Soft box, CrossFit box, Jumping mat, Gym box, plyometric box, Gym jumping box", 
    imageUrl: "https://m.media-amazon.com/images/I/31-y3ItRrAL._SX300_SY300_QL70_FMwebp_.jpg", 
    category: "Functional Training", 
    subcategory: "Plyometric Boxes"
  },

  // Wearable Technology
  {
    name: "Fitness Trackers", 
    price: 3999, 
    description: "Amazfit Band 7 Activity Fitness Tracker, Always-on AMOLED Display, Alexa Built-in, Up to 18-Day Battery Life, 24H Heart Rate & SpO2 Monitoring, 5 ATM Water Resistant, 120 Sports Modes (Black)", 
    imageUrl: "https://m.media-amazon.com/images/I/61-PhP53C2L._SX679_.jpg", 
    category: "Wearable Technology", 
    subcategory: "Fitness Trackers"
  },
  {
    name: "Heart Rate Monitors", 
    price: 39000, 
    description: "Frontier X2 Smart Heart Monitor with Chest Strap, Wireless Heart Health Monitoring Device with Heart Strain, Breathing Rate, Heart Rhythm and Fitness Tracking with Continuous Heart Rate Monitoring", 
    imageUrl: "https://m.media-amazon.com/images/I/41-jjr2oOaL._SX679_.jpg", 
    category: "Wearable Technology", 
    subcategory: "Heart Rate Monitors"
  },
  {
    name: "Smartwatches", 
    price: 1499, 
    description: "Fastrack New Limitless X2 Smartwatch|1.91\" UltraVU with Rotating Crown|60 Hz Refresh Rate|Advanced Chipset|SingleSync BT Calling|NitroFast Charge|100+ Sports Mode & Watchfaces|Upto 5 Day Battery|IP68", 
    imageUrl: "https://media.sketchfab.com/models/4c7bd5c621924bcab225dc41e71232fe/thumbnails/d292181f06ef4771af658bee57d48b22/8d2e66185ce84462bc2f59e926e3e1a7.jpeg", 
    category: "Wearable Technology", 
    subcategory: "Smartwatches"
  },
  {
    name: "GPS Devices", 
    price: 3990, 
    description: "Qubo Wireless GPS Tracker from Hero Group | Pre-Recharged SIM | Voice Monitoring | 10000 mAh Battery | Ride Start & Geo Fence Alerts | for Car, Bike, Scooty | 1 Year App Subscription Included", 
    imageUrl: "https://m.media-amazon.com/images/I/61TRVqA9jWL._SX522_.jpg", 
    category: "Wearable Technology", 
    subcategory: "GPS Devices"
  }
];

mongoose.connect('mongodb://localhost:27017/FitAR', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(products); // Add new products
    console.log('Products added');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
