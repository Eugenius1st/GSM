// hooks
import { Link } from 'react-router-dom';

interface TitleBarType {
    title: string;
    navigationURL: string;
}

const TitleBar = ({ title, navigationURL }: TitleBarType) => {
    return (
        <div className="flex items-center justify-between eg-marginY">
            <div className="text-xl font-bold">{title}</div>
            <div className="text-sm font-medium text-egPurple-default">
                <Link to={navigationURL}>See All</Link>
            </div>
        </div>
    );
};

export default TitleBar;
