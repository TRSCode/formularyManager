export default function Dashboard() {
    // return <h1>Dashboard</h1>
    return(
        <div className="container col-4">
            <h1 className="text-center">Progress</h1>
            <hr/>
            <h3>Phase I</h3>
            <ul>
                <li>Basic CRUD (find all and create built into form, need to add remaining fields and update/delete</li>
                <li>✅ Basic UI</li>
            </ul>
            <h3>Phase II</h3>
            <ul>
                <li>☑️Sort by name, exp, location </li>
                <li>Alert if expired</li>
                <li>List Meds by location (location is glitchy)</li>
                <li>Conduct Inventory Feature</li>
                <li>Create Actions Menu</li>
                <li>Improve Dashboard to have status of meds and info panel (consider API) </li>
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
    )
        

}