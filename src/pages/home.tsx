import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function home() {
    const notify = () => {
        toast("Default Notification !");
    }
    return (
        <div>

            <button onClick={notify}>Notify</button>
            <ToastContainer />
        </div>
    )
}
