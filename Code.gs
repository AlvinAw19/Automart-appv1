// the code below is an extension from the google sheets: 'https://docs.google.com/spreadsheets/d/1sgSuWNdGhaiK7NBgEC_OsOKZ2vHsHGrwZ-mjeERCnnk/edit?usp=sharing'

function doGet() {
  checkAndSendEmails();
  return HtmlService.createHtmlOutputFromFile('loginPage');
}

function validateLogin(username, password) {
  var validUsername = 'a';
  var validPassword = 'a';
  
  if (username === validUsername && password === validPassword) {
    return HtmlService.createHtmlOutputFromFile('mainPage').getContent();
  } else {
    return 'Invalid username or password';
  }
}

function getCategoriesAndProducts() {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var categories = [];
  var products = [];
  
  for (var i = 1; i < data.length; i++) {
    if (!categories.includes(data[i][0])) {
      categories.push(data[i][0]);
    }
    var product = { 
      category: data[i][0], 
      name: data[i][1],
      stock: data[i][3],
      expiryDate: new Date(data[i][4]).toLocaleDateString(),
      imageUrl: data[i][7],
      sourceEmail: data[i][5]
    };
    products.push(product);
  }
  
  return { categories: categories, products: products };
}

function getProductSalesData(productName) {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var salesData = {};

  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === productName) {
      salesData = {
        'January': data[i][8],
        'February': data[i][9],
        'March': data[i][10],
        'April': data[i][11],
        'May': data[i][12],
        'June': data[i][13],
        'July': data[i][14]
      };
      break;
    }
  }
  
  return salesData;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function checkStockAndExpiry() {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var ownerEmail = 'alvinawemail@gmail.com';

  var lowStockProducts = [];
  var nearExpiryProducts = [];
  var branchShortages = [];

  for (var i = 1; i < data.length; i++) {
    var stock = data[i][3];
    var expiryDate = new Date(data[i][4]);
    var currentDate = new Date();
    var daysUntilExpiry = (expiryDate - currentDate) / (1000 * 60 * 60 * 24);
    var supplierEmail = data[i][5];
    var productName = data[i][1];
    var branches = [data[i][15], data[i][16], data[i][17]];

    if (stock < 15) {
      lowStockProducts.push({
        email: supplierEmail,
        productName: productName,
        orderQuantity: 50
      });
    }
    
    if (daysUntilExpiry <= 30) {
      nearExpiryProducts.push(productName);
      for (var j = 0; j < branches.length; j++) {
        if (branches[j] < 15) {
          branchShortages.push({
            productName: productName,
            branch: j + 1
          });
        }
      }
    }
  }

  if (lowStockProducts.length > 0) {
    try {
      sendBatchEmailsToSuppliers(lowStockProducts);
    } catch (e) {
      Logger.log('Failed to send batch email to suppliers. Error: ' + e.toString());
    }
  }

  if (nearExpiryProducts.length > 0) {
    try {
      sendEmailToOwner(ownerEmail, nearExpiryProducts, branchShortages);
    } catch (e) {
      Logger.log('Failed to send email to owner for near expiry products. Error: ' + e.toString());
    }
  }
}

function sendBatchEmailsToSuppliers(lowStockProducts) {
  var emailBatches = {};
  lowStockProducts.forEach(product => {
    if (!emailBatches[product.email]) {
      emailBatches[product.email] = [];
    }
    emailBatches[product.email].push(product.productName);
  });

  for (var email in emailBatches) {
    var subject = 'Order Request for Multiple Products';
    var body = 'Dear Supplier,\n\nWe need to order the following products:\n\n';
    emailBatches[email].forEach(productName => {
      body += '- ' + productName + ' (50 units)\n';
    });
    body += '\nThank you,\nAutoMart';
    MailApp.sendEmail(email, subject, body);
  }
}

function sendEmailToOwner(email, nearExpiryProducts, branchShortages) {
  var subject = 'Products Near Expiry';
  var body = 'Dear Owner,\n\nThe following products are nearing their expiry dates:\n\n';
  nearExpiryProducts.forEach(productName => {
    body += '- ' + productName + '\n';
  });
  body += '\nBranch shortages:\n';
  branchShortages.forEach(shortage => {
    body += '- ' + shortage.productName + ' at Branch ' + shortage.branch + '\n';
  });
  body += '\nPlease choose one of the following actions.\n1. Send to a nearby branch as shown above. \n2. Have a special promotion on the product. \n\nThank you,\nAutoMart';
  MailApp.sendEmail(email, subject, body);
}

function checkAndSendEmails() {
  checkStockAndExpiry();
}

function getSheet() {
  var url = 'https://docs.google.com/spreadsheets/d/1sgSuWNdGhaiK7NBgEC_OsOKZ2vHsHGrwZ-mjeERCnnk/edit?usp=sharing';
  var spreadsheet = SpreadsheetApp.openByUrl(url);
  return spreadsheet.getActiveSheet();
}
