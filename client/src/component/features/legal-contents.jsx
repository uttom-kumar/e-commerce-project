import FeatureStore from "../../store/FeatureStore.js";
import LegalContentSkeleton from "../../skeleton/legal-content-skeleton.jsx";
import parse from "html-react-parser";


const LegalContents = () => {
    const {LegalDetails} = FeatureStore()
    console.log(LegalDetails)
    return (
        <>
            {
                LegalDetails === null? (<LegalContentSkeleton />) : (
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card p-4">
                                    {parse(LegalDetails[0]?.description)}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default LegalContents;