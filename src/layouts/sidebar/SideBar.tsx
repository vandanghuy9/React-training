import { Box, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
export const drawerWidth = 300;
export const miniDrawerWidth = 50;
type Props = {
  open: boolean;
};

const styles = {
  drawerPaper: {
    height: "calc(100% - 64px)",
    marginTop: 8,
    overflowX: "hidden",
    width: drawerWidth,
    flexShrink: 0,
    border: "none",
    // boxShadow: `2px 0px 1px -1px rgb(0 0 0 / 20%),
    //   1px 0px 1px 0px rgb(0 0 0 / 14%),
    //   1px 0px 3px 0px rgb(0 0 0 / 12%)`,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
};
const SideBar = ({ open }: Props) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      variant="persistent"
      sx={styles.drawer}
      PaperProps={{ sx: styles.drawerPaper }}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {["/", "map", "grid"].map((text, index) => (
            <Link to={text} key={index}>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text === "/" ? "Table" : text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
