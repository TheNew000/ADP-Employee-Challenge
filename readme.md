#ADP Coding Challenge!


mongoimport --db ADP --collection employees --drop --file api/assets/employee-dataset.json
mongoimport --db ADP --collection company --drop --file api/assets/company-dataset.json
mongoimport --db ADP --collection managers --drop --file api/assets/manager-dataset.json
