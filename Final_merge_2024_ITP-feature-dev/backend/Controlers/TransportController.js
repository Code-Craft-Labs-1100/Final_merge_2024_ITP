const model = require("../Model/TransportModel");

//Transport

const typeColors = {
  car: "#F73905",
  van: "#14F705",
  motobick: "#0CE2E9"
};

async function addtransport(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { customername, vehicletype, rentdate, claimdate, rentprice } = req.body;

  let category = await model.TransportCategories.findOne({ vehicletype });
  if (!category) {
    try {
      const color = typeColors[vehicletype];

      category = await new model.TransportCategories({
        vehicletype,
        color
      }).save();
    } catch (err) {
      return res
        .status(400)
        .json({ message: `Error while creating category: ${err}` });
    }
  }

  try {
    const create = await new model.Transports({
      customername,
      vehicletype,
      rentdate,
      claimdate,
      rentprice
    }).save();

    return res.json(create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating Transport ${err}` });
  }
}

async function createVehicletypes(req, res) {
  let { vehicletype, color } = req.body;

  try {
    const Create = await new model.TransportCategories({
      vehicletype,
      color
    }).save();

    return res.json(Create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating product categories ${err}` });
  }
}

async function getTransportCategory(req, res) {
  let data = await model.TransportCategories.find({});

  let filter = await data.map((v) =>
    Object.assign(
      {},
      {
        color: v.color,
        customername: v.customername,
        vehicletype: v.vehicletype,
        rentdate: v.rentdate,
        claimdate: v.claimdate,
        rentprice: v.rentprice
      }
    )
  );
  return res.json(filter);
}

async function getTrasportLabels(req, res) {
  try {
    const result = await model.Transports.aggregate([
      {
        $lookup: {
          from: "transportCategoriesModel",
          localField: "vehicletype",
          foreignField: "vehicletype",
          as: "transportCategoriesModel_info"
        }
      },
      {
        $unwind: "$transportCategoriesModel_info"
      }
    ]);

    console.log("Aggregation Result:", JSON.stringify(result, null, 2));

    let data = result.map((v) =>
      Object.assign(
        {},
        {
          id: v._id,
          color: v.color,
          customername: v.customername,
          vehicletype: v.vehicletype,
          rentdate: v.rentdate,
          claimdate: v.claimdate,
          rentprice: v.rentprice,
          color: v.transportCategoriesModel_info.color
        }
      )
    );
    res.json(data);
  } catch (error) {
    console.error("Error during aggregate query:", error);
    res.status(400).json("Lookup Collection Error");
  }
}

//get all Transport
const getalltransport = async (req, res) => {
  try {
    const transport = await model.Transports.find();
    res.status(200).json(transport);
  } catch (error) {
    console.error("Error retrieving Transport:", error);
    res
      .status(500)
      .json({ message: "Error retrieving Transport", error: error.message });
  }
};

//get one Transport by id
const gettransportById = async (req, res) => {
  try {
    const transport = await model.Transports.findById(req.params.id);
    if (!transport) {
      return res.status(404).json({ message: "Transport not found" });
    }
    res.status(200).json(transport);
  } catch (error) {
    console.error("Error retrieving Transport by ID:", error);
    res
      .status(500)
      .json({ message: "Error retrieving Transport", error: error.message });
  }
};
async function updateTransport(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Post HTTP Data not provided" });
  }

  const _id = req.params._id;
  const { customername, vehicletype, rentdate, claimdate, rentprice } =
    req.body.recordId.data;

  try {
    const updatedIncome = await model.Transports.findByIdAndUpdate(
      _id,
      { customername, vehicletype, rentdate, claimdate, rentprice },
      { new: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Machine not found" });
    }

    return res.json(updatedIncome);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while updating Product: ${err}` });
  }
}

async function deletTransport(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Request body not found" });
  }

  try {
    await model.Transports.deleteOne(req.body);
    return res.json("Record Deleted...!");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while deleting Machine Record" });
  }
}

//

// Export the functions
module.exports = {
  addtransport,
  createVehicletypes,
  getTransportCategory,
  getTrasportLabels,
  getalltransport,
  gettransportById,
  updateTransport,
  deletTransport
};
