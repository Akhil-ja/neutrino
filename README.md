# Neutrino - Nutrition Analysis Web App

Neutrino is a web application that allows users to search for food items, view their nutritional information, and compare the nutritional content of two food items. It uses the Nutritionix API to fetch the nutritional data.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/neutrino.git
    cd neutrino
    ```

2.  **Install dependencies:**
    The project has a `frontend` directory which contains the React application.
    ```bash
    cd frontend
    npm install
    ```

3.  **Set up environment variables:**
    The application requires API credentials from Nutritionix. You need to create a `.env` file in the `frontend` directory with the following content:
    ```
    VITE_APP_ID=your_app_id
    VITE_API_KEY=your_api_key
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Nutritionix API

This project uses the [Nutritionix API](https://www.nutritionix.com/business/api) to get nutritional information about food items.

### How to get API Key and App ID

1.  Go to the [Nutritionix API page](https://www.nutritionix.com/business/api) and sign up for a developer account.
2.  After signing up, you will find your **API Key** and **App ID** in your dashboard.

### API Usage and Limitations

The free plan of the Nutritionix API has limitations on the number of requests you can make.

*   **Daily Limit:** The free tier typically allows a few hundred requests per day (e.g., around 200 requests).
*   **Exceeding Limits:** If you exceed the daily limit, you will receive an error from the API (such as a `429 Too Many Requests` error), and the application will not be able to fetch more data until the limit resets.

For more detailed and up-to-date information on API limits, please refer to the official [Nutritionix API documentation](https://docs.nutritionix.com/).
