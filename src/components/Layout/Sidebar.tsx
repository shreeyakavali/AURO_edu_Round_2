import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Book, School, Quiz, History, Settings } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

export const Sidebar = () => {
  const theme = useTheme();

  const menuItems = [
    { text: 'Lessons', icon: <Book /> },
    { text: 'Courses', icon: <School /> },
    { text: 'Quizzes', icon: <Quiz /> },
    { text: 'History', icon: <History /> },
    { text: 'Settings', icon: <Settings /> }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
        },
      }}
    >
      <Toolbar /> {/* For proper spacing below AppBar */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'primary.main' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;