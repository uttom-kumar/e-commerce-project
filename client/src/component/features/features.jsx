import FeatureStore from "../../store/FeatureStore.js";
import FeaturesSkeleton from "../../skeleton/features-skeleton.jsx";

const Features = () => {
    const {FeatureList} = FeatureStore()
    return (
        <>
            <div className="container section">
                <div className="row">
                    {
                        FeatureList === null? <FeaturesSkeleton /> :
                        FeatureList?.map((item, i) => (
                            <div key={i} className="col-6 p-2 col-md-3 col-lg-3 col-sm-6 col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-3">
                                                <img className="w-100" src={item.img}/>
                                            </div>
                                            <div className="col-9">
                                                <h3 className="bodyXLarge">{item.name}</h3>
                                                <span className="bodySmal">{item.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Features;