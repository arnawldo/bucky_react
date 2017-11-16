import React, {Component} from 'react'
import PropTypes from 'prop-types';
import ShowMoreBucketsButton from "./ShowMoreBucketsButton";
import Bucket from "./Bucket";


class ShowBuckets extends Component {


    componentDidMount() {
        const {user, onFetchBuckets} = this.props;
        if (user.hasOwnProperty("username")) {
            onFetchBuckets(user.username, user.password)
        }
    }

    componentWillMount() {
        const {user, history} = this.props;
        if (!user.hasOwnProperty("username")) {
            history.push('/')
        }
    }

    componentWillUnmount() {
        const {onResetPageCounter} = this.props;
        onResetPageCounter();
    }

    render() {
        const {user, bucketlists, bucketPaginator, onFetchBucketPage, onRemoveBucket, onBucketEnterEditMode,
            onBucketExitEditMode, onEditBucket} = this.props;


        return (<ul id="list-of-buckets" className="gloria-font">
            {(bucketlists.length === 0) ?
                <li className="bucket">No Buckets Here. (Add a Bucket)</li> :
                bucketlists.map((bucket, i) =>
                    <Bucket key={i}
                            {...bucket}
                            user={user}
                            onEditBucket={onEditBucket}
                            onRemoveBucket={() => onRemoveBucket(bucket.id, "arnold", "test")}
                            onBucketEnterEditMode={() => onBucketEnterEditMode(bucket.id)}
                            onBucketExitEditMode={() => onBucketExitEditMode(bucket.id)}/>
                )
            }
            <ShowMoreBucketsButton key={9999}
                                   user={user}
                                   bucketPaginator={bucketPaginator}
                                   onFetchBucketPage={onFetchBucketPage}/>
        </ul>);
    }
}

ShowBuckets.propTypes = {
    bucketlists: PropTypes.array.isRequired,
    onRemoveBucket: PropTypes.func.isRequired,
    onFetchBucketPage: PropTypes.func.isRequired,
    onBucketEnterEditMode: PropTypes.func.isRequired,
    onBucketExitEditMode: PropTypes.func.isRequired,
    onResetPageCounter: PropTypes.func.isRequired,
    onFetchBuckets: PropTypes.func.isRequired,
    onEditBucket: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default ShowBuckets
