import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../components/Spinner";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";

import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const { goals, isLoading, isError, message } = useSelector(
        (state) => state.goals
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) {
            navigate("/login");
        }
        dispatch(getGoals());

        return () => dispatch(reset());
    }, [user, navigate, dispatch, isError, message]);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div>
            <section className="heading">
                <h1> Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>
            <GoalForm />
            <section className="content">
                {goals.length > 0 ? (
                    <div className="goals">
                        {goals.map((goal) => (
                            <GoalItem key={goal._id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <h3>No goals set</h3>
                )}
            </section>
        </div>
    );
}

export default Dashboard;
