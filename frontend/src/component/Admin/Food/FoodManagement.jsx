import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FoodItem } from "./FoodItem";
import { getMenuItemsByRestaurantId, updateMenuItemAvailability } from "../../State/Menu/Action";

export const FoodManagement = () => {

  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, menu } = useSelector(store => store);

    const handleUpdateAvailability = (id) => {
      dispatch(updateMenuItemAvailability({ menuItemId: id, jwt }));
    };

    useEffect(() => {
    if (restaurant.usersRestaurant?.id) {
        dispatch(
        getMenuItemsByRestaurantId({
            restaurantId: restaurant.usersRestaurant.id,
            jwt
        })
        );
    }
    }, [dispatch, restaurant.usersRestaurant?.id, jwt]);

    const getImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http")
        ? path
        : `${import.meta.env.VITE_API_URL}${path}`;
    };

  return (
    <div className="font-[Poppins] bg-[#1a1a1a] rounded-2xl p-8">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Food Management
          </h1>

          <p className="text-gray-400 mt-1">
            Manage your restaurant menu
          </p>
        </div>

        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "#ea580c",
            "&:hover": {
              backgroundColor: "#c2410c"
            }
          }}
        >
          Add Food
        </Button>

      </div>

      <Tabs
        value={tab}
        onChange={(e, value) => setTab(value)}
        textColor="inherit"
        indicatorColor="primary"
      >
        <Tab label="Food Items" />
      </Tabs>

      <Box mt={4}>
        <TableContainer
            component={Paper}
            sx={{
            backgroundColor: "#1f1f1f",
            borderRadius: "16px",
            overflow: "hidden"
            }}
        >
            <Table>

            <TableHead>
                <TableRow sx={{ background: "#262626" }}>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Image</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Price</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Veg</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Available</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>

                {menu.menuItems?.map((item) => (

                <TableRow key={item.id} hover>

                    <TableCell>

                    <>

                    <img
                        src={getImageUrl(item.images?.[0])}
                        alt={item.name}
                        style={{
                        width: 70,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: 10
                        }}
                    />
                    </>

                    </TableCell>

                    <TableCell sx={{ color: "white" }}>
                    {item.name}
                    </TableCell>

                    <TableCell sx={{ color: "white" }}>
                    ₹{item.price}
                    </TableCell>

                    <TableCell>

                    <Chip
                        label={item.isVegetarian ? "Veg" : "Non Veg"}
                        color={item.isVegetarian ? "success" : "error"}
                    />

                    </TableCell>

                    <TableCell>

                    <Chip
                        label={item.available ? "Available" : "Unavailable"}
                        color={item.available ? "success" : "default"}
                        onClick={() => handleUpdateAvailability(item.id)}
                        sx={{ cursor: "pointer" }}
                    />

                    </TableCell>

                </TableRow>

                ))}

            </TableBody>

            </Table>
        </TableContainer>
    </Box>

      <Dialog
        open={open}
        maxWidth="lg"
        fullWidth
        onClose={() => setOpen(false)}
      >
        <DialogContent
          sx={{
            background: "#1a1a1a"
          }}
        >
          <FoodItem onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

    </div>
  );
};