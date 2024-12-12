import Skeleton from "react-loading-skeleton";

const LegalContentSkeleton = () => {
    return (
        <div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            {
                                Array.from({length: 16}).map((_,i)=> (
                                    <div key={i} className="card-body">
                                        <Skeleton count={3}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalContentSkeleton;