import WishStore from "../../store/WishStore.js";

const WishSubmitButton = (props) => {

    let {isWishSubmit}=WishStore();

    return (
        <>
            {
                isWishSubmit===false ? (
                    <button onClick={props.onClick} type="submit" className={props.className}>{props.text}</button>
                ) : (
                    <button disabled={true} className={props.className}>
                        <div className="spinner-border spinner-border-sm" role="status"></div>
                        Processing...
                    </button>
                )
            }
        </>
    )
};
export default WishSubmitButton;