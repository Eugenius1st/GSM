import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { Link } from 'react-router-dom';
// icons
import { FiMenu } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa6';
import { IoHomeSharp } from 'react-icons/io5';
import { MdOutlineSportsSoccer } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { GoBellFill } from 'react-icons/go';
// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';

export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const adminListItems = [
        { title: 'HOME', link: '/admin', icon: <IoHomeSharp /> },
        { title: '회원관리', link: '/admin/user', icon: <FaUserAlt /> },
        { title: '코치관리', link: '/admin/coach', icon: <MdOutlineSportsSoccer /> },
        { title: '수업관리', link: '/admin/class', icon: <FaBook /> },
        { title: '알림 및 안내', link: '/admin/notification', icon: <GoBellFill /> },
    ];

    const DrawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <List>
                <div className="flex items-center p-2">
                    <img
                        src={galloping_purple_logo}
                        alt="galloping_purple_logo"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-6 text-2xl font-bold text-egPurple-default">GSM</div>
                </div>
            </List>
            <Divider />
            <List>
                {adminListItems.map((el, idx) => (
                    <ListItem
                        key={idx}
                        disablePadding
                    >
                        <Link
                            to={el.link}
                            className="w-full py-2"
                        >
                            <ListItemButton>
                                <ListItemIcon>{el.icon}</ListItemIcon>
                                <ListItemText primary={el.title} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div>
            <FiMenu
                onClick={toggleDrawer(true)}
                className="w-6 h-6 text-egPurple-default"
            />
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
}
