import notFount from '../../assets/images/no-results.png'
const NoDataFound = () => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-4 text-center">
                    <img src={notFount} className="img-fluid" alt="notFound"/>
                </div>
            </div>
        </div>
    );
};

export default NoDataFound;