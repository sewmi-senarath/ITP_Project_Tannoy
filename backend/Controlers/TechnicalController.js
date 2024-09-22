const model = require("../Model/TechnicalModel");

//addmachine

const typeColors = {
  HDPE: "#F73905",
  PVC: "#14F705",
  Polypropylene: "#0CE2E9",
  Polystyrene: "#0F33E7",
  Acrylic: "#B90FE7",
};

async function addmachine(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { name, materialtype, servicedate, nextservicedate, description, Cost } =
    req.body;

  let category = await model.MachineCategories.findOne({ materialtype });
  if (!category) {
    try {
 
      const color = typeColors[materialtype];

      category = await new model.MachineCategories({
        materialtype,
        color,
      }).save();
    } catch (err) {
      return res
        .status(400)
        .json({ message: `Error while creating category: ${err}` });
    }
  }

  try {
    const create = await new model.Technical({
      name,
      materialtype,
      servicedate,
      nextservicedate,
      description,
      Cost,
    }).save();

    return res.json(create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating Machine ${err}` });
  }
}

async function createMachineCategory(req, res) {
  let { materialtype, color } = req.body;

  try {
    const Create = await new model.MachineCategories({
      materialtype,
      color,
    }).save();

    return res.json(Create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating product categories ${err}` });
  }
}

async function getMachineCategory(req, res) {
  let data = await model.MachineCategories.find({});

  let filter = await data.map((v) =>
    Object.assign(
      {},
      {
        name: v.name,
        materialtype: v.materialtype,
        servicedate: v.servicedate,
        nextservicedate: v.nextservicedate,
        description: v.description,
        Cost: v.Cost,
        color: v.color,
      }
    )
  );
  return res.json(filter);
}

async function getMachineLabels(req, res) {
  try {
    const result = await model.Technical.aggregate([
      {
        $lookup: {
          from: "machineCategoriesModel", 
          localField: "materialtype",
          foreignField: "materialtype",
          as: "machineCategoriesModel_info",
        },
      },
      {
        $unwind: "$machineCategoriesModel_info",
      },
    ]);

    console.log("Aggregation Result:", JSON.stringify(result, null, 2)); 

    let data = result.map((v) =>
      Object.assign(
        {},
        {
          id: v._id,
          name: v.name,
          materialtype: v.materialtype,
          servicedate: v.servicedate,
          nextservicedate: v.nextservicedate,
          description: v.description,
          Cost: v.Cost,
          color: v.machineCategoriesModel_info.color, 
        }
      )
    );
    res.json(data);
  } catch (error) {
    console.error("Error during aggregate query:", error);
    res.status(400).json("Lookup Collection Error");
  }
}

//get all machine
const getallmachine = async (req, res) => {
  try {
    const machines = await model.Technical.find();
    res.status(200).json(machines);
  } catch (error) {
    console.error("Error retrieving Machine:", error);
    res
      .status(500)
      .json({ message: "Error retrieving Machine", error: error.message });
  }
};

//get one machine by id
const getmachineById = async (req, res) => {
  try {
    const machine = await model.Technical.findById(req.params.id);
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }
    res.status(200).json(machine);
  } catch (error) {
    console.error("Error retrieving machine by ID:", error);
    res
      .status(500)
      .json({ message: "Error retrieving machine", error: error.message });
  }
};
async function updatemachine(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Post HTTP Data not provided" });
  }

  const _id = req.params._id;
  const {
    name,
    materialtype,
    servicedate,
    nextservicedate,
    description,
    Cost,
  } = req.body.recordId.data;

  try {
    const updatedIncome = await model.Technical.findByIdAndUpdate(
      _id,
      { name, materialtype, servicedate, nextservicedate, description, Cost },
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
async function deletemachine(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Request body not found" });
  }

  try {
    await model.Technical.deleteOne(req.body);
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
  addmachine,
  createMachineCategory,
  getMachineCategory,
  getMachineLabels,
  getallmachine,
  getmachineById,
  updatemachine,
  deletemachine,
};
