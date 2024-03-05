interface TitleBarType {
    title: string;
    navigationURL: string;
}

const TitleBar = ({ title, navigationURL }: TitleBarType) => {
    return (
        <div className="flex items-center justify-between eg-marginY">
            <div className="text-xl font-bold">{title}</div>
            <div className="text-sm font-medium text-egPurple-default">See All</div>
        </div>
    );
};

export default TitleBar;
