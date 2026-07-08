import { Card, CardContent, Typography } from "@mui/material";

function SummaryCard({
                         title,
                         value,
                     }) {
    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                height: "100%",
            }}
        >
            <CardContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mt: 1 }}
                >
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default SummaryCard;