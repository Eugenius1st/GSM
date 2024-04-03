//hooks
import { Link } from 'react-router-dom';

interface TabType {
    title: string;
    link: string;
}
interface SubTabType {
    tabs: TabType[];
    func: () => void;
}

const SubTab = ({ tabs, func }: SubTabType) => {
    return (
        <div className="absolute z-20 w-32 mt-3 rounded-md shadow-md bg-egWhite-default">
            {tabs.map((el, idx) => (
                <Link to={el.link}>
                    <div
                        key={idx}
                        className="px-3 py-2 hover:text-egPurple-default"
                    >
                        {el.title}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SubTab;
