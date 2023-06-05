export default function Dashboard() {
    // return <h1>Dashboard</h1>
    return(
        <div className="container col-9 d-flex">
            <div className="container col-6">
                <h1>Progress</h1>
                <hr/>
                <h3>Phase I</h3>
                <ul>
                    <li>✅ Build Wire Frame (https://share.balsamiq.com/c/3Yqk3JmJ2fAgsPf2rBaH7S.png)</li>
                    <li>✅ Basic CRUD</li>
                    <li>✅ Basic UI</li>
                    <li>✅ Display oneMed as an Alert message</li>
                    <li>✅ Highlight med if expiring in 30, 60, and 90 days</li>
                    <li>✅ Highlight med if expired</li>
                    <li>☑️ Create Actions Menu (may need to add viewOne)</li>
                    <li>✅ Sort by name, exp, location (glitchy) </li>
                    <li>Conduct Inventory sorted by location that also updates quantity on hand</li>
                </ul>
                <h3>Phase II</h3>
                <ul>
                    <li>Add user with user levels (1-4, systemAdmin, manager with viewOnly, manager with update/delete, user with view and inventory)</li>
                    <li>Create pdf upon completion of inventory and save into DB</li>
                    <li>Create ability for inventory to be signed by person who completed the inventory and a witness (for controlled substances) </li>
                    <li>Create useMed feature (include notes that state who and why a med was dispensed/used)</li>
                    <li>Improve Dashboard to have status of meds and info panel (consider adding openFDA API) </li>
                </ul>
                <h3>Phase III</h3>
                <ul>
                    <li>Compare approved formulary with meds and quantity on hand</li>
                    <li>Ability to import file instead of populating the database one by one</li>
                    <li>Add openFDA API drug search https://api.fda.gov/drug/ndc.json?search=%22morphine%22&limit=5  https://open.fda.gov/apis/drug/ndc/how-to-use-the-endpoint/ </li>
                    <li>compare med name with openFDA to see if med exists prior to adding to DB</li>
                    <li>Improve style</li>
                    <li>Deploy</li>
                </ul>
            </div>
            <div className="container col-6">
                <h1>Issues</h1>
                <hr/>
                <ul>
                    <li>Validation messages don't clear from MedForm w/o refresh </li> 
                    <li>Display sort is glitchy for Location and Expiration</li>
                    <li>Hover doesn't change background of row</li>
                </ul>
                <h3>Feedback</h3>
                <ul>
                    <li>✅ change 30/60/90 to 30/60/120 days till expiration</li>
                    <li>✅ add price per unit for forecasting budget</li>
                </ul>
            </div>
        </div>
    )
        

}