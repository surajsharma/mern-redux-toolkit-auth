import React from "react";
import { deleteGoal } from "../features/goals/goalSlice";
import { useDispatch } from "react-redux";

function GoalItem({ goal }) {
    const dispatch = useDispatch();
    return (
        <div className="goal">
            <div>
                {new Date(
                    parseInt(goal._id.toString().substring(0, 8), 16) * 1000
                ).toLocaleDateString("en-US")}
            </div>
            <h2>{goal.text}</h2>
            <button
                onClick={() => dispatch(deleteGoal(goal._id))}
                className="close"
            >
                X
            </button>
        </div>
    );
}

export default GoalItem;
