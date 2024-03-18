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
import { FaInbox } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const adminListItems = [
        { title: 'HOME', link: '/admin' },
        { title: '회원관리', link: '/admin/user' },
        { title: '코치관리', link: '/admin/coach' },
        { title: '수업관리', link: '/admin/class' },
        { title: '알림 및 안내', link: '/admin/notification' },
    ];

    const DrawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <List>
                {adminListItems.map((el, idx) => (
                    <ListItem
                        key={idx}
                        disablePadding
                    >
                        <Link to={el.link}>
                            <ListItemButton>
                                <ListItemIcon>{idx % 2 === 0 ? <FaInbox /> : <IoMdMail />}</ListItemIcon>
                                <ListItemText primary={el.title} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem
                        key={text}
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemIcon>{index % 2 === 0 ? <FaInbox /> : <IoMdMail />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
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
