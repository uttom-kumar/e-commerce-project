import React from 'react';
import UserStore from "../../store/UserStore.js";

const UserSubmitBtn = (props) => {
    let {isFromSubmit} = UserStore()

    return (
        <>
            {
                isFromSubmit === false ? (
                    <button onClick={props.onClick} type="submit" className={props.className} >{props.text}</button>
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

export default UserSubmitBtn;