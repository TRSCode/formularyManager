# Formulary Manager
## Full-Stack MERN application
Wire-frame: https://share.balsamiq.com/c/3Yqk3JmJ2fAgsPf2rBaH7S.png

Tools Used:
* React, JavaScript, Express, Mongoose, Axios, Cors, Node.js, Bootstrap

Overview:
Formulary Manager AKA Med Manager is a tool that simplifies tracking medications in stock for organizations such as small medical clinics and response units (EMS, Federal Response Teams, etc).  This tool will eliminate the need for binders and paper logs.  The user will be able to see what medications they have, where, and how much.  This tool simplifies inventory.  Managers will be able to conduct oversight and forecast spending.

This project intends to accomplish the following:
* Track medications by percent on hand
* Track expiration dates of medications giving the user a warning if meds will expire w/i 30/60/120 days and medications that have expired.
* Initially all users are full-access users until login/registration is complete
* Full-access users will be able to add and remove formulary items
* Full-access users will be able to conduct inventories and update supplies on hand
* Users will be able to view medications by name or location (bag, room, safe etc..)

Product Backlog:
V.2 features will include:
* User registration and login
* API to openFDA to search medications 
* Cross reference openFDA API prior to creating new formulary entry to ensure an accurate medication is entered
* System administrator for user access levels
* There will be user levels (full-access, inventory access, and view only)
* View only users will be limited to view the formulary and status of medications
* Create inventory records
* Order Request for medications
* bulk formulary entries through file upload
* integrate appropriate forms needed by regulatory agencies