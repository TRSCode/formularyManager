export default function Dashboard() {
    // return <h1>Dashboard</h1>
    return(
        <div className="container col-4">
            <h1 className="text-center">Progress</h1>
            <hr/>
            <h3>Phase I</h3>
            <ul>
                <li>Basic CRUD</li>
                <li>✅ Basic UI</li>
            </ul>
            <h3>Phase II</h3>
            <ul>
                <li>✅ Sort by name, type, expiration etc</li>
                <li>Alert if expired</li>
                <li>List Meds by location</li>
                <li>Conduct Inventory Feature</li>
                <li>Create Actions Menu</li>
                <li>Improve Dashboard to have status of meds and info panel</li>
            </ul>
            <h3>Phase III</h3>
            <ul>
                <li>Add user with user levels (admin 1,2,3, view only)</li>
                <li>Improve style</li>
                <li>Deploy</li>
            </ul>
    </div>
    )
        

}