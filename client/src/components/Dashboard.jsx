export default function Dashboard() {
    // return <h1>Dashboard</h1>
    return(
        <div className="container col-9 d-flex">
            <div className="container col-6">
                <h1>Progress</h1>
                <hr/>
                <h3>Phase I</h3>
                <ul>
                    <li>✅Build Wrire Frame (https://share.balsamiq.com/c/3Yqk3JmJ2fAgsPf2rBaH7S.png)</li>
                    <li>Basic CRUD (still need: inventoryOne/viewOne/updateOne/delete</li>
                    <li>✅ Basic UI</li>
                </ul>
                <h3>Phase II</h3>
                <ul>
                    <li>☑️Sort by name, exp, location (glitchy) </li>
                    <li>✅Alert if expired</li>
                    <li>☑️List Meds by location (glitchy)</li>
                    <li>Conduct Inventory Feature</li>
                    <li>Create Actions Menu</li>
                    <li>Improve Dashboard to have status of meds and info panel (consider adding openFDA API) </li>
                </ul>
                <h3>Phase III</h3>
                <ul>
                    <li>Add user with user levels (admin 1,2,3, view only)</li>
                    <li>Improve style</li>
                    <li>Ability to import file instead of populating the database one by one</li>
                    <li>Add openFDA API drug search https://api.fda.gov/drug/ndc.json?search=%22morphine%22&limit=5  https://open.fda.gov/apis/drug/ndc/how-to-use-the-endpoint/ </li>
                    <li>Deploy</li>
                </ul>
            </div>
            <div className="container col-6">
                <h1>Issues</h1>
                <hr/>
                <ul>
                    <li>Error messages don't clear from form w/o refresh </li> 
                    <li>Display sort is glitchy for Location and Expiration</li>
                    <li>Hover doesn't change background of row</li>
                </ul>
            </div>
        </div>
    )
        

}