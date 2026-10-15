Month End Audit

A React.js application that allows users to scan or search a METRC UID to retrieve package information and submit an updated quantity.

Features

METRC UID Search — Scan or manually enter a METRC UID to search for package details.

Package Information — Display item name, strain, harvest, location, and current quantity.

New Quantity — Enter a new quantity for the selected METRC UID.

API Integration — Retrieve package information using a GET request and submit the new quantity using a POST request.

Input Validation — Validate the METRC UID and new quantity before submitting.

Loading Indicators — Display loading messages while API requests are processing.

Clear Fields — Reset the input and displayed information to perform another search.

Technologies Used

React.js

JavaScript

Vite

HTML

CSS

REST APIs

Getting Started

Prerequisites

Node.js

npm

Access to the required APIs

Installation

Clone the repository:

git clone https://github.com/ramyathogiti/MonthEnd-Audit.git

Navigate to the project directory:

cd MonthEnd-Audit

Install dependencies:

npm install

Configure your API URLs in a local .env file:

VITE_BASE_URL=your_get_api_url
VITE_POST_API_URL=your_post_api_url

Start the development server:

npm run dev

Open the local URL displayed in the terminal.

How It Works

Scan or enter a METRC UID.

Click Submit to retrieve the package information.

Review the displayed package details and current quantity.

Enter the new quantity.

Click POST to submit the updated quantity.

Click Clear to reset the form and search for another package.
