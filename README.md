# Bazaar: Your Modern Online Marketplace

**Overview**

Bazaar is a feature-rich e-commerce application built with Next.js, providing a seamless shopping experience for users. It offers essential functionalities like user authentication, product creation, order placement, secure payments, and order tracking. The application is fully responsive, ensuring optimal performance across various devices.

**Key Features**

- **Secure Authentication:** Leverages Clerk for robust user authentication and management.
- **Product Management:** Enables administrators to create and manage product listings efficiently.
- **Seamless Ordering:** Provides a user-friendly interface for browsing products and placing orders.
- **Secure Payments:** Integrates with Stripe to enable secure and convenient online payments.
- **Order Tracking:** Allows users to track the status and delivery of their orders.
- **Responsive Design:** Adapts seamlessly to different screen sizes and devices.

**Tech Stack**

- **Frontend:**

  - Next.js
  - React
  - Radix UI
  - Tailwind CSS
  - Lucide React (icons)
  - class-variance-authority (for styling)
  - tailwind-merge & tailwindcss-animate (styling utilities)

- **Backend:**

  - Next.js API Routes/Serverless Functions
  - Prisma (ORM)
  - Supabase (Bucket)
  - PlanetScale MySQL database
  - Stripe (payment processing)

- **Other:**

  - Clerk (authentication)
  - Axios (HTTP requests)
  - Zod (schema validation)
  - use-debounce (debouncing for input fields)
  - react-share (social sharing)

**Getting Started**

1. **Clone the repository:** `git clone https://github.com/Ninja-Jutsu/bazaar.git`
2. **Install dependencies:** `npm install` or `yarn install`
3. **Set up environment variables:**
   - Create a `.env.local` file and configure the required environment variables (database connection, Supabase keys, Stripe keys, Clerk credentials, etc.).
4. **Run the development server:** `npm run dev` or `yarn dev`
5. **Open in your browser:** `http://localhost:3000`

**Contributing**

Contributions are welcome! Please read the CONTRIBUTING.md file for guidelines on how to contribute to the project.

**License**

This project is licensed under the MIT License.

**Contact**

For any questions or inquiries, please contact [ninja.jutsu.way@gmail.com].
