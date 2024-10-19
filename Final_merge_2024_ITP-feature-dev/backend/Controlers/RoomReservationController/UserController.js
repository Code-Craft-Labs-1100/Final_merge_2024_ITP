const User = require("../../Model/RoomReservationModel/UserModel");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};
const addUsers = async (req, res) => {
  const {
    guests,
    checkin,
    checkout,
    promocode,
    country,
    numberOfDays,
    roomType,
    roomPrice,
    totalPrice,
  } = req.body;

  try {
    const user = new User({
      guests,
      checkin,
      checkout,
      promocode,
      country,
      numberOfDays,
      roomType,
      roomPrice,
      totalPrice,
    });

    const savedUser = await user.save();
    return res.status(201).json({
      user: {
        ...savedUser.toObject(),
        id: savedUser._id,
      },
    });
  } catch (err) {
    console.error("Database error:", err);
    return res
      .status(500)
      .json({ message: "Unable to add booking", error: err.message });
  }
};

const checkAvailability = async (req, res) => {
  const { roomType, checkin, checkout } = req.query;

  try {
    const overlappingBookings = await User.find({
      roomType,
      $or: [
        {
          checkin: { $lt: new Date(checkout) },
          checkout: { $gt: new Date(checkin) },
        },
      ],
    }).countDocuments();

    const maxRooms = 60; // Adjust this based on how many rooms of this type are available
    const isAvailable = overlappingBookings < maxRooms;

    res.json({ isAvailable });
  } catch (err) {
    console.error("Error checking availability:", err);
    res
      .status(500)
      .json({ message: "Error checking availability", error: err.message });
  }
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { checkin, checkout, guests, country, numberOfDays } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          checkin,
          checkout,
          guests: {
            adults: guests.adults,
            children: guests.children,
          },
          country,
          numberOfDays,
        },
      },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({
      message: "Booking updated successfully",
      user: {
        ...updatedUser.toObject(),
        id: updatedUser._id, // Ensure the ID is included and named consistently
      },
    });
  } catch (err) {
    console.error("Database error:", err);
    return res
      .status(500)
      .json({ message: "Error updating booking", error: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(`Deleted user with ID: ${id}`);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  addUsers,
  getById,
  updateUser,
  deleteUser,
  checkAvailability,
};
