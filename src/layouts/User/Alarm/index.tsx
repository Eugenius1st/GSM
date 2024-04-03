// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';

const Alarm = () => {
    const alarmInfo = [
        {
            title: '[수업안내]',
            class: '성인여성반',
            remainingSeat: 2,
            date: '2024-03-28',
            image: galloping_purple_logo,
            read: true,
        },
        {
            title: '[수업안내]',
            class: '성인여성반',
            remainingSeat: 2,
            date: '2024-03-28',
            image: galloping_purple_logo,
            read: true,
        },
        {
            title: '[수업안내]',
            class: '성인여성반',
            remainingSeat: 2,
            date: '2024-03-28',
            image: galloping_purple_logo,
            read: true,
        },
        {
            title: '[수업안내]',
            class: '성인여성반',
            remainingSeat: 2,
            date: '2024-03-28',
            image: galloping_purple_logo,
        },
        {
            title: '[수업안내]',
            class: '성인여성반',
            remainingSeat: 2,
            date: '2024-03-28',
            image: galloping_purple_logo,
            read: false,
        },
        {
            title: '[수업안내]',
            class: '성인여성반',
            remainingSeat: 2,
            date: '2024-03-28',
            image: galloping_purple_logo,
        },
        {
            title: '[수업안내]',
            class: '성인여성반',
            remainingSeat: 2,
            date: '2024-03-28',
            image: galloping_purple_logo,
            read: false,
        },
        {
            title: '[수업안내]',
            class: '성인여성반',
            remainingSeat: 2,
            date: '2024-03-28',
            image: galloping_purple_logo,
            read: false,
        },
        {
            title: '[수업안내]',
            class: '성인여성반',
            remainingSeat: 2,
            date: '2024-03-28',
            image: galloping_purple_logo,
            read: false,
        },
        {
            title: '[수업안내]',
            class: '성인여성반',
            remainingSeat: 2,
            date: '2024-03-28',
            image: galloping_purple_logo,
            read: false,
        },
    ];
    return (
        <div className="eg-default-wrapper">
            <div className="eg-title">나의 알림</div>
            {alarmInfo.map((el) => (
                <div
                    className={
                        el.read
                            ? 'flex items-center w-full px-3 py-3 rounded-md bg-egPurple-superLight'
                            : 'flex items-center w-full px-3 py-3 rounded-md bg-egGrey-light'
                    }
                >
                    <img
                        src={el.image}
                        alt="logo"
                        className="w-12 h-12 mr-4 rounded-full"
                    />
                    <div>
                        <div className="mb-1 font-bold">{el.title}</div>
                        <div>
                            현재 <span className="font-bold">{el.class}</span> 수업 잔여석이{' '}
                            <span className="font-bold">{el.remainingSeat}자리</span> 남았습니다. 신청자는 신청하세요.
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Alarm;
