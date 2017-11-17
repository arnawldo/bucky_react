import React from "react"
import PropTypes from "prop-types";


const SearchedBucket = ({ id, name, history }) => {

    const goToTasks = (e) => {
        e.preventDefault();
        history.push("/bucketlists/:id/tasks".replace(":id", id));
    };

    return <li className="bucket">
        <a href="/ignore-this-url" onClick={goToTasks}>{name}</a>
    </li>
};


SearchedBucket.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired
};

export default SearchedBucket