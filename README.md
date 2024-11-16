# **FitAR - Your Fitness Equipment Marketplace with AR Integration**

FitAR is a modern web-based platform designed for fitness enthusiasts to explore, visualize, and purchase a variety of fitness equipment. From basic gym essentials like dumbbells to advanced machines like treadmills and stationary bikes, FitAR delivers a seamless shopping experience with a unique Augmented Reality (AR) feature. This functionality allows users to preview products in their real-world environments, making it easier to make informed purchase decisions. Whether you're building a home gym or upgrading your fitness routine, FitAR provides a one-stop solution for all your equipment needs.

### **Objective**

FitAR aims to deliver a user-centric platform that integrates fitness equipment shopping with immersive AR capabilities. The project focuses on enhancing the shopping experience by allowing users to:

• Explore a wide range of fitness equipment organized by categories.

• Visualize products in their real-world environment using AR for better decision-making.

• Manage profiles, wishlists, and shopping carts seamlessly.

• Securely purchase fitness equipment through a streamlined checkout system.

### **Features**

**Frontend Features**

• Product Catalog & Filtering: Browse equipment by categories like Flexibility & Recovery, Cardio, Strength, and more, with filters for price range, type, and brand.

• AR Preview: Visualize select equipment (e.g., dumbbells, treadmills) in real-world environments.

• User Profiles: Manage personal details, order history, and saved items.

• Wishlist & Cart: Add favorite products to the wishlist, move items to the cart, and enjoy real-time price updates during checkout.

• Search Functionality: Advanced search bar with keyword suggestions for quick product discovery.

**Backend Features**

• Secure Authentication: User login and session management with JWT for data privacy.

• Order & Inventory Management: Real-time updates to inventory levels during purchases.

• Database Management: MongoDB stores user data, product details, wishlist items, and order history.

• Payment Gateway Integration: Multiple secure payment options, including credit cards and digital wallets.

### **Tech Stack**

**Frontend**

• Languages & Frameworks: React.js, HTML, CSS, JavaScript

• Libraries: AR.js, Three.js for AR integration

**Backend**

• Frameworks: Node.js, Express.js

• Authentication: JSON Web Tokens (JWT) for secure user sessions

**Database**

• MongoDB: NoSQL database for scalable and flexible data storage

### **System Design**

Frontend: Built using React.js with structured components to manage routes like Home, Product Catalog, Profile, and Checkout.

Backend: API development with Express.js to handle user authentication, product management, and order processing.

Database: MongoDB for storing user profiles, products, orders, and wishlist items.

### **Installation and Setup**

**Prerequisites**

• Node.js and npm installed.

• MongoDB installed and running.

**Steps to Run the Project**

• Clone the Repository

git clone https://github.com/yourusername/fitar.git  

cd fitar  

• Install Dependencies

For the backend:

cd fitar-backend  

npm install  

For the frontend:

cd fitar-frontend  

npm install  

• Setup Environment Variables

In the fitar-backend folder, create a .env file and add the following:

MONGO_URI=mongodb://localhost:27017/FitAR  

JWT_SECRET=your_jwt_secret  

• Run the Application

Start the backend:

cd fitar-backend  

npm start  

Start the frontend:

cd fitar-frontend  

npm start  

• Access the Application

Open your browser and navigate to http://localhost:3000.

### **Technical Challenges Encountered and Solutions**

•	AR Rendering Across Devices: Managed challenges in AR rendering by optimizing model formats and using responsive design to ensure compatibility across devices.

•	Data Latency: Resolved slow data retrieval by implementing caching techniques and optimizing MongoDB queries to improve response times.

•	Cross-Browser Compatibility: Addressed issues with AR not rendering consistently on all browsers by testing across browsers and implementing polyfills as needed.

•	Enhanced Error Handling: Improved error handling on both the frontend and backend, especially for booking processes, ensuring complete and accurate data submission.

### **Future Enhancements**

• Enhanced AR Capabilities - Implement a full 360-degree AR preview, allowing users to view fitness equipment from all angles. This addition can increase user confidence in purchasing larger items, as users can visualize how equipment fits within their home or gym space.

•	Machine Learning-Based Recommendations - Use machine learning algorithms to analyze user behavior and recommend products aligned with their fitness interests. This can lead to more personalized shopping experiences and increased customer satisfaction.

•	Loyalty Program and Rewards - Introduce a loyalty program where users can earn points with each purchase, redeemable for discounts, free items, or exclusive offers. This can help increase customer retention and brand loyalty.

•	Multilingual and Currency Support - Expand to a global audience by adding multilingual capabilities, local currency display, and international shipping options, making the website more accessible for non-English-speaking users and those shopping internationally.

### **Images**

**Home Page**
![image](https://github.com/user-attachments/assets/b32298d1-10af-4c0c-a8a7-670d51d18323)
![image](https://github.com/user-attachments/assets/1a228d18-9d06-40cb-9c29-36dfeb92f5cc)
![image](https://github.com/user-attachments/assets/0b72a3a9-3490-4f3f-a6b1-d4c9384a2288)

**Register Page**
![image](https://github.com/user-attachments/assets/679b2606-e772-477d-bceb-8b0a1d274516)

**Login Page**
![image](https://github.com/user-attachments/assets/64d5d679-b5bb-49e4-bc16-3d6d4e7423d6) 

**Profile Page**
![image](https://github.com/user-attachments/assets/78e41e45-296a-4a12-9975-a9dd4d8fe7a8)

**Flexibility & Recovery Page**
![image](https://github.com/user-attachments/assets/09c81921-7c8f-41d5-8b5c-d8ec0edfee44)

**Bodyweight Page**
![image](https://github.com/user-attachments/assets/7ea453f0-61f8-4515-ba50-ebc315c11250)

**Cardio Page**
![image](https://github.com/user-attachments/assets/519e59a7-298f-4063-b16b-f6a1039370de)

**Strength Page**
![image](https://github.com/user-attachments/assets/27dda000-9315-4dec-bca4-5aa42f437117)

**Functional Training Page**
![image](https://github.com/user-attachments/assets/3b9f7670-5aa3-4d83-a879-f655534c4919)

**Wearable Technology Page**
![image](https://github.com/user-attachments/assets/ad0bc781-58ca-4d63-916e-69d3a7f419e7)

**AR View**
![image](https://github.com/user-attachments/assets/50c8308d-84e1-4b06-8461-23a6e881324f)
![image](https://github.com/user-attachments/assets/8bc341ad-9967-4f6e-81e8-b58a244ba285)

**Cart Page**
![image](https://github.com/user-attachments/assets/480c2485-5af6-4d87-9ff8-6e5c4dcdd4bc)
![image](https://github.com/user-attachments/assets/5a17988a-58ef-42ce-9e5a-ae9e9ba893ca)
 
**Order Confirmation Page**
![image](https://github.com/user-attachments/assets/ca1f1c36-0f33-4179-a85b-de408af631fa)

**Orders Page**
![image](https://github.com/user-attachments/assets/8e5d301c-ed1b-4c64-9ce0-bf087ee4c16f)

### **Author**
This project was developed by:

Heemit Shah

Role: Full Stack Developer

Responsibilities: Designed and implemented the entire project, including frontend development, backend logic, database management, and AR integration.

### **Contact**
If you have any questions or suggestions, feel free to reach out at heemit.shah@somaiya.edu
