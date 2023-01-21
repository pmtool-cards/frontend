import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, IconButton } from "@mui/material";
import { Board, useDeleteBoard } from "../api/boards";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

type BoardItemProps = {
  board: Board;
};

const BoardItem = ({ board }: BoardItemProps) => {
  const navigate = useNavigate();

  const { mutate: deleteBoard } = useDeleteBoard();

  const handleDeleteBoard = () => {
    deleteBoard(board.id);
  };

  const handleOpenBoard = () => {
    navigate(`/boards/${board.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleOpenBoard}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {board.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created by: {board.user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created at: {new Date(board.createdAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Updated at: {new Date(board.updatedAt).toDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label="edit" color="primary">
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={handleDeleteBoard}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BoardItem;
