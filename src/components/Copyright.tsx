import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">PMTool-Cards</Link> {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;
