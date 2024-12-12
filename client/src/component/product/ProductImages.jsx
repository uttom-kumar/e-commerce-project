import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import ProductStore from "../../store/ProductStore.js";


const ProductImages = () => {
    const {ProductDetails} = ProductStore()
    let images = [
        {
            original : ProductDetails[0]['productDetail'][0]['img1'],
            thumbnail : ProductDetails[0]['productDetail'][0]['img1'],
        },
        {
            original : ProductDetails[0]['productDetail'][0]['img2'],
            thumbnail : ProductDetails[0]['productDetail'][0]['img2'],
        },
        {
            original : ProductDetails[0]['productDetail'][0]['img3'],
            thumbnail : ProductDetails[0]['productDetail'][0]['img3'],
        },
        {
            original : ProductDetails[0]['productDetail'][0]['img4'],
            thumbnail : ProductDetails[0]['productDetail'][0]['img4'],
        },
        {
            original : ProductDetails[0]['productDetail'][0]['img5'],
            thumbnail : ProductDetails[0]['productDetail'][0]['img5'],
        },
        {
            original : ProductDetails[0]['productDetail'][0]['img6'],
            thumbnail : ProductDetails[0]['productDetail'][0]['img6'],
        },
        {
            original : ProductDetails[0]['productDetail'][0]['img7'],
            thumbnail : ProductDetails[0]['productDetail'][0]['img7'],
        },
        {
            original : ProductDetails[0]['productDetail'][0]['img8'],
            thumbnail : ProductDetails[0]['productDetail'][0]['img8'],
        }
    ]
    return (
        <div>
            <ImageGallery autoPlay={false} items={images}/>
        </div>
    );
};

export default ProductImages;