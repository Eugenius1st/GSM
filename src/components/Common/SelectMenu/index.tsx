// Materal UI
import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu, MenuListboxSlotProps } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';

interface SelectMenuType {
    menuList: string[];
}
export default function SelectMenu({ menuList }: SelectMenuType) {
    const [category, setCategory] = React.useState(menuList[0]);
    const createHandleMenuClick = (menuItem: string) => {
        return () => {
            setCategory(menuItem);
        };
    };

    return (
        <Dropdown>
            <MenuButton>{category}</MenuButton>
            <Menu slots={{ listbox: AnimatedListbox }}>
                {menuList.map((el, idx) => (
                    <MenuItem
                        key={idx}
                        onClick={createHandleMenuClick(el)}
                    >
                        {el}
                    </MenuItem>
                ))}
            </Menu>
        </Dropdown>
    );
}

const purple = {
    50: '#f6efff',
    100: '#eee2ff',
    200: '#e5d3ff',
    300: '#dbc1ff',
    400: '#d2b2ff',
    500: '#c49bff',
    600: '#b682ff',
    700: '#a260ff',
    800: '#8d3dff',
    900: '#6B00FF',
};

const Listbox = styled('ul')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  min-width: 80px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? purple[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? purple[700] : purple[200]};
  color: ${theme.palette.mode === 'dark' ? purple[300] : purple[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? purple[900] : purple[200]};
  z-index: 1;

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(
    props: MenuListboxSlotProps,
    ref: React.ForwardedRef<HTMLUListElement>
) {
    const { ownerState, ...other } = props;
    const popupContext = React.useContext(PopupContext);

    if (popupContext == null) {
        throw new Error('The `AnimatedListbox` component cannot be rendered outside a `Popup` component');
    }

    const verticalPlacement = popupContext.placement.split('-')[0];

    return (
        <CssTransition
            className={`placement-${verticalPlacement}`}
            enterClassName="open"
            exitClassName="closed"
        >
            <Listbox
                {...other}
                ref={ref}
            />
        </CssTransition>
    );
});

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? purple[800] : purple[200]};
    background-color: ${theme.palette.mode === 'dark' ? purple[50] : purple[50]};
    color: ${theme.palette.mode === 'dark' ? purple[300] : purple[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? purple[700] : purple[400]};
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? purple[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? purple[700] : purple[200]};
  color: ${theme.palette.mode === 'dark' ? purple[200] : purple[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? purple[800] : purple[50]};
    border-color: ${theme.palette.mode === 'dark' ? purple[600] : purple[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? purple[700] : purple[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? purple[300] : purple[200]};
    outline: none;
  }
  `
);
