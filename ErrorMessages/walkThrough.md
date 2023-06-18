- Working on color scheme still
- Login/Reg works to login a user, but doesn't protect routes yet; need alert messages added from validations.
- Navbar: has custom logo, shows user, active tab, links to proper location
- Dashboard: info only at this time, will include other features such as search openFDA, status of inventory graph, to do items based on expirations or custom todo's
- Formulary: displays all and sorts with color styling; hover fields included that excludes action buttons; hover fields are clickable to display full med detail alert message; delete warning alert provided
- Edit MED: pre-populated; required fields with alert messages
- Inventory: consider moving an inventory input to formulary tab for user ease, based on user level. Would like to add inputs for conducted by and witnessed by to save into the DB. Will need to add a utilization feature to properly account for meds when used and possibly an approval prior to updating onHand amounts.
- Printable inventory view: would like to add a print button to print or save as pdf, for now have to right click the mouse
- Tabs link appropriately, logout works, but get error in console.

Issues during the project: 
- the sort function was very challenging but done with a sort handler and a way to reset the sort to avoid re-selecting different sorts to get the correct sort.
- difficulty with showing the date without time/seconds
- difficulty with reg/log and protecting routes
- difficulty with getting the nav bar to show tabs after logging in