# AutoMart Web App

## Overview

AutoMart is a web application designed to streamline inventory management for mini-marts and convenience stores. It offers features such as real-time inventory tracking, automated reordering, sales insights, and near-expiry item management.

## Features

- **Login Page**: Secure login for authorized users.
- **Main Page**: Displays categories and products, with options to filter by category and search by product name.
- **Inventory Management**: Highlights low-stock and near-expiry items with visual indicators.
- **Sales Insights**: Provides detailed sales data for selected products, displayed using Google Charts.
- **Automated Notifications**: Sends email notifications for low-stock and near-expiry products to suppliers and store owners.

## Getting Started

### Prerequisites

- A Google account to access Google Sheets and Google Apps Script.
- Basic knowledge of HTML, CSS, JavaScript, and Google Apps Script.

### Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/automart.git
   cd automart
   ```

2. **Google Apps Script Project**:
   - Open [Google Apps Script](https://script.google.com/).
   - Create a new project and replace the default code with the contents of `Code.gs`.
   - Save the project and authorize necessary permissions.

3. **Google Sheets Setup**:
   - Create a new Google Sheet with the following columns: 'Category',	'Product Name',	'Price (RM)',	'Stock',	'Expiry Date',	'Source Email',	'Source',	'Picture',	'Sales in Jan',	'Sales in Feb',	'Sales in 
     Mar',	'Sales in Apr',	'Sales in May',	'Sales in Jun',	'Sales in Jul',	'Branch 1',	'Branch 2',	'Branch 3'
   - Fill the sheet with sample data for testing.
   - Copy the Google Sheet URL and update the `getSheet` function in `Code.gs` with this URL.

4. **Deploy Web App**:
   - In the Google Apps Script project, click on `Deploy` > `New deployment`.
   - Select `Web app`, set the access permissions, and deploy.
   - Copy the web app URL provided.

5. **Update HTML Files**:
   - Replace the placeholder URLs in `loginPage.html` and `mainPage.html` with the correct paths to your deployed web app and any images used.

### Usage

1. **Login**:
   - Navigate to the web app URL and enter the credentials (`username: a`, `password: a`).

2. **Main Page**:
   - Browse through categories and products.
   - Use the search bar to find specific products.
   - Click on product images to view detailed sales insights.

## File Structure

```
automart/
├── Code.gs
├── loginPage.html
├── mainPage.html
├── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

- **Aw Shen Yang, Au Jenq, Gurgobind Singh, Somkiet Phromsuwan** - Data Science Students at Monash University
---

## Contact

For any inquiries or support, please contact [Aw Shen Yang](mailto:alvinawemail@gmail.com).

---
