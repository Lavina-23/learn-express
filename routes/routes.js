const express = require("express");
const router = express.Router();
const Model = require("../models/model");

module.exports = router;

// Post Method
router.post("/post", async (req, res) => {
	// parameter "/post" adalah route dan parameter (req, res) adalah callback
	// res untuk mengirim response ke client, misal Postman. req untuk menerima request dari client

	const data = new Model({
		name: req.body.name,
		age: req.body.age,
	});

	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}

	// res.send("Post API");
});

// Get all Method
router.get("/getAll", async (req, res) => {
	try {
		const data = await Model.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
	// res.send("Get All API");
});

// Get by ID Method
router.get("/getOne/:id", async (req, res) => {
	try {
		const data = await Model.findById(req.params.id);
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}

	res.send(req.params.id);
});

// Update by ID Method
router.patch("/update/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const updateData = req.body;
		const options = { new: true };

		const result = await Model.findByIdAndUpdate(id, updateData, options);

		res.send(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
	// res.send("Update by ID API");
});

// Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const data = await Model.findByIdAndDelete(id);

		res.send(`Document with ${data.name} has been deleted`);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}

	res.send("Delete by ID API");
});
