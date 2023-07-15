import { AiOutlineFilePdf } from 'react-icons/ai';
import { GiOverdose } from 'react-icons/gi';
import dosingChart from './assets/img/dosing_chart.png';
import approvedFormulary from './assets/documents/FY23_formulary.pdf';

export default function Dashboard() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header dashHeader">
                            <h4 className="card-title">Resource Hub</h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled" style={{ paddingLeft: '0', textAlign: 'left' }}>
                                <li>
                                    <a href= {approvedFormulary} target="_blank" >
                                        <AiOutlineFilePdf /> Approved Formulary
                                    </a>
                                </li>
                                <li>
                                    <a href= {dosingChart} target="_blank">
                                        <GiOverdose /> Dosing Chart - Rapid Sequence
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header dashHeader">
                            <h4 className="card-title">Search openFDA</h4>
                        </div>
                        <div className="card-body">
                            <form className="mb-3">
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control" id="searchInput" placeholder="Enter generic drug name" />
                                        </div>
                                        <div className="col-auto">
                                            <button type="submit" className="btn btn-primary">Search</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card text-center">
                        <div className="card-header dashHeader">
                            <h4 className="card-title">Whats New!</h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled" style={{ paddingLeft: '0', textAlign: 'left' }}>
                                <li>✅ Build Wire-frame</li>
                                <li>✅ Basic CRUD</li>
                                <li>✅ Basic UI</li>
                                <li>✅ Display oneMed as an Alert message</li>
                                <li>✅ Highlight med if expiring in 30, 60, and 90 days</li>
                                <li>✅ Highlight med if expired</li>
                                <li>✅ Create Actions Menu</li>
                                <li>✅ Sort by name, exp, location</li>
                                <li>✅ Conduct Inventory sorted by location that also updates quantity on hand</li>
                                <li>☑️ Add user with user levels (1-4, systemAdmin, manager with viewOnly, manager with update/delete, user with view and inventory)</li>
                                <li>☑️ Create pdf upon completion of inventory and save into DB</li>
                            </ul>
                        </div>
                        <div className="card-header dashHeader">
                            <h4 className="card-title">Coming Soon!</h4>
                        </div>
                        <div className="card-body">
                            <h5>Phase II</h5>
                            <ul style={{ paddingLeft: '5px', textAlign: 'left' }}>
                                <li>Create ability for inventory to be signed by person who completed the inventory and a witness (for controlled substances) </li>
                                <li>Create useMed feature (include notes that state who and why a med was dispensed/used)</li>
                                <li>Add openFDA API drug search https://api.fda.gov/drug/ndc.json?search=%22morphine%22&limit=5  https://open.fda.gov/apis/drug/ndc/how-to-use-the-endpoint/ </li>
                            </ul>
                            <h5>Phase III</h5>
                            <ul style={{ paddingLeft: '5px', textAlign: 'left' }}>
                                <li>Compare approved formulary with meds and quantity on hand</li>
                                <li>Ability to import file instead of populating the database one by one</li>
                                <li>compare med name with openFDA to see if med exists prior to adding to DB</li>
                                <li>Improve style</li>
                                <li>Deploy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
