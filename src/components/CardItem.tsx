import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Card as CardType, useDeleteCard } from "../api/boards";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type CardItemProps = {
  card: CardType;
};

const CardItem = ({ card }: CardItemProps) => {
  const { mutate: deleteCard } = useDeleteCard(card.columnId.toString());

  const handleDeleteCard = () => {
    deleteCard(card.id);
  };

  const handleOpenCard = () => {};

  return (
    <Card sx={{ maxHeight: "70px" }}>
      <CardActionArea onClick={handleOpenCard}>
        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            sx={{ textAlign: "center" }}
          >
            {card.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
