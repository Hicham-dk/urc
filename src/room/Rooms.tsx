/*import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userInfosSelector } from "../features/loginSlice";
import { CustomError } from "../model/CustomError";
import { Room } from "../model/common";
import { Link } from "react-router-dom";
import { getRooms } from "./RoomsApi";
import { Box, Grid, Paper, Typography } from "@mui/material";

const Rooms = () => {
  const userInfos = useSelector(userInfosSelector);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    if (userInfos?.userId) {
      getRooms(
        userInfos.userId,
        (roomsData) => {
          setError(null);
          setRooms(roomsData);
        },
        (fetchError) => {
          console.error("Error fetching rooms:", fetchError);
          setRooms([]);
          setError(fetchError);
        }
      );
    }
  }, [userInfos]);

  return (
    <Box>
      <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
        <hr />
        Salons
      </Typography>

      {error && (
        <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
          Error: {error.message}
        </Typography>
      )}

      <Grid container spacing={4}>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.room_id}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  textAlign: "center",
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white',
                  },
                }}
                component={Link}
                to={`/messages/room/${room.room_id}`}
              >
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {room.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                  Créé le: {room.created_on}
                </Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body2" textAlign="center">
              Aucun salon trouvé.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Rooms;*/
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userInfosSelector } from "../features/loginSlice";
import { CustomError } from "../model/CustomError";
import { Room } from "../model/common";
import { Link } from "react-router-dom";
import { getRooms } from "./RoomsApi";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const Rooms = () => {
  const userInfos = useSelector(userInfosSelector);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    if (userInfos?.userId) {
      getRooms(
        userInfos.userId,
        (roomsData) => {
          setError(null);
          setRooms(roomsData);
        },
        (fetchError) => {
          console.error("Error fetching rooms:", fetchError);
          setRooms([]);
          setError(fetchError);
        }
      );
    }
  }, [userInfos]);

  return (
    <Box>
      <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
        Mes Salons
      </Typography>

      {error && (
        <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
          Error: {error.message}
        </Typography>
      )}

      <Grid container direction="column" spacing={2}>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <Grid item xs={12} key={room.room_id}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  bgcolor: "primary.dark",
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "primary.light",
                  },
                }}
                component={Link}
                to={`/messages/room/${room.room_id}`}
              >
                <ChatIcon sx={{ fontSize: 40, color: "white" }} />
                <Box>
                  <Typography variant="h6">{room.name}</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    Créé le: {room.created_on}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" textAlign="center">
            Aucun salon trouvé.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Rooms;
