import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ColorModeToggle from "../../../shared-theme/ColorModeSelect";

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Antares
                    </Typography>
                    <ColorModeToggle />
                </Toolbar>
            </AppBar>
        </Box>
    );
}