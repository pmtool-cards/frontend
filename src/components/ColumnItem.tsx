import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CardActions, IconButton } from "@mui/material";
import {
  Card as CardType,
  Column,
  useAddCard,
  useDeleteColumn,
  useUpdateCard,
} from "../api/boards";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CardItem from "./CardItem";
import { Draggable, Container } from "react-smooth-dnd";
import AddIcon from "@mui/icons-material/Add";
import PosCalculation from "../utils/pos-calculation";

type ColumnItemProps = {
  column: Column;
};

const ColumnItem = ({ column }: ColumnItemProps) => {
  const { mutate: deleteColumn } = useDeleteColumn(column.boardId.toString());

  const { mutate: addCard } = useAddCard(column.boardId.toString());

  const { mutate: updateCard } = useUpdateCard(column.boardId.toString());

  const handleDeleteColumn = () => {
    deleteColumn(column.id);
  };

  const handleAddCard = () => {
    addCard({
      title: "New card",
      columnId: column.id,
      order:
        column.cards && column.cards.length > 0
          ? column.cards[column.cards.length - 1].order + 16384
          : 16384,
    });
  };

  const onCardDrop = (columnId, addedIndex, removedIndex, payload) => {};

  return (
    <Card sx={{ minWidth: 200, maxWidth: 345 }}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center" }}
        >
          {column.title}
        </Typography>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            gap: 1,
          }}
        >
          <Container
            orientation={"vertical"}
            groupName="col"
            onDrop={(e) => {
              console.log("card", e);
              onCardDrop(item.id, e.addedIndex, e.removedIndex, e.payload);
            }}
            getChildPayload={(index) => {
              return column.cards[index];
            }}
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {column.cards.length
              ? column.cards.map((card: CardType) => (
                  <Draggable key={card.id}>
                    <CardItem card={card} />
                  </Draggable>
                ))
              : "-"}
          </Container>
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label="edit" color="primary">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="add" color="success" onClick={handleAddCard}>
          <AddIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={handleDeleteColumn}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ColumnItem;
