import React, {Component} from "react"
import PropTypes from "prop-types";
import SearchedBucket from "./SearchedBucket";


class ShowSearchedBuckets extends Component {

    componentWillUnmount() {
        const {onClearSearchedBucketLists} = this.props;
        onClearSearchedBucketLists();
    }


    render() {

        const { user, searchedBucketLists, history} = this.props;

        if (user.hasOwnProperty("username")) {
            return (<ul id="list-of-buckets" className="gloria-font">
                {(searchedBucketLists.length === 0) ?
                    <li className="bucket">No Results</li> :
                    searchedBucketLists.map((bucket, i) =>
                        <SearchedBucket key={i}
                                        history={history}
                                        {...bucket}/>
                    )
                }
            </ul>);
        } else {
            history.push("/");
            return <p></p>
        }
    }

}

ShowSearchedBuckets.propTypes = {
    searchedBucketLists: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};

export default ShowSearchedBuckets
