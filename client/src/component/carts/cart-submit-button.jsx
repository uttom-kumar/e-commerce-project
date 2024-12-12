import CartStore from "../../store/CartStore.js";


const CartSubmitButton = (props) => {
    let {isCartSubmit}=CartStore();

    return (
        <>
            {
                isCartSubmit === false ? (
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
export default CartSubmitButton;