import ProductStore from "../../store/ProductStore.js";
import {Link} from "react-router-dom";
import CategorySkeleton from "../../skeleton/category-skeleton.jsx";


const Categories = () => {
    const {categoryList} = ProductStore()
    const handleScrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };
    return (
        <div>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <h1 className="headline-4 text-center my-2 p-0">Top Categories</h1>
                        <span
                            className="bodySmal mb-5 text-center">Explore a World of Choices Across Our Most Popular <br
                        />Shopping Categories </span>
                        {
                            categoryList === null? <CategorySkeleton />:
                            categoryList?.map((item, i) => (
                                <div key={i} className="col-6 col-lg-8r text-center col-md-8r p-2">
                                    <Link to={`/by-category/${item['_id']}`} className="card h-100 rounded-3 bg-white" onClick={handleScrollToTop}>
                                        <div className="card-body">
                                            <img alt="" className="category_img" src={item['categoryImg']}/>
                                            <p className="bodySmal mt-3">{item.categoryName}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;