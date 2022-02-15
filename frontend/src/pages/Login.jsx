import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { logIn, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

import { FaSignInAlt } from "react-icons/fa";
import Spinner from "../components/Spinner";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            if (message.includes("400")) {
                toast.error("Invalid Credentials");
            } else {
                toast.error(message);
            }
        }

        if (isSuccess || user) {
            navigate("/");
        }

        dispatch(reset());
    }, [user, message, isError, isSuccess, navigate, dispatch]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!password || !email) {
            toast.error("Please enter email and password!");
        } else {
            const userData = {
                email,
                password,
            };
            dispatch(logIn(userData));
        }
    };

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            name="email"
                            placeholder="enter your email"
                            onChange={onChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            name="password"
                            placeholder="enter password"
                            onChange={onChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <button type="submit" className="btn btn-block">
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
