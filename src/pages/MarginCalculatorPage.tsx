import { Typography } from "@mui/material";
import MarginCalculator from "../components/margin-calculator/MarginCalculator";

export default function MarginCalculatorPage() {
    return (
        <div>
            <div
                style={{
                    textAlign: "center",
                    padding: "3rem 1rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "3rem",
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        letterSpacing: "-0.5px",
                        mb: 1,
                    }}
                >
                    Margin Calculator
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        maxWidth: 700,
                        fontSize: "1.05rem",
                        lineHeight: 1.6,
                    }}
                >
                    Calculate NSE & BSE F&O margin requirements including SPAN, Exposure, and Premium.
                    Build strategies and instantly analyze capital requirements before placing trades.
                </Typography>
            </div>
            <MarginCalculator />
        </div>
    );
}