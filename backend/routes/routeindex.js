const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/verifyAccess");
const Note = require("../model/note");
const User = require("../model/user");


const router = express();

// Login
router.post("/login", async (req, res) => {
    let email = req.body.email;
    let plainpassword = req.body.password;

    let user = await User.findOne({ email: email });

    if (!user) {
        res.json({
            message: "User or password is incorrect",
            code: "UPI",
            err: true,
        });
    } else {
        let valid = await bcrypt.compareSync(plainpassword, user.password);

        if (valid) {
            const today = new Date();
            const expiresDate = new Date();

            expiresDate.setDate(today.getDate() + 1);

            let token = jwt.sign({ id: user.email }, process.env.SECRET, {
                expiresIn: "1d",
            });
            res.json({ token: token, expiresIn: expiresDate });
        } else {
            res.json({
                message: "User or password is incorrect",
                code: "UPI",
                err: true,
            });
        }
    }
});

// Register
router.post("/register", async (req, res) => {
    let user = new User(req.body);

    let exists = await User.findOne({ email: user.email });

    if (!exists) {
        user.password = bcrypt.hashSync(user.password, 10);
        await user.save();
        res.json({ message: "User created", code: "UC", err: false });
    } else {
        res.json({ message: "User already exists", code: "UAE", err: true });
    }
});

// Get notes
router.get("/notes", verify, async (req, res) => {
    let notes = await Note.find({ user_id: req.userId });
    return res.json(notes);
});

// Create note
router.post("/notes", verify, async (req, res) => {
    let note = new Note(req.body);
    note.user_id = req.userId;
    await note.save();
    res.json(note);
});

// Edit note
router.put("/notes", verify, async (req, res) => {
    let note = await Note.findById(req.body._id);

    if (note) {
        note.title = req.body.title;
        note.body = req.body.body;
        await note.save();
        res.json({ msg: "Note edited" });
    } else {
        res.json({ msg: "Could not edit note" });
    }
});

// Delete note
router.delete("/notes", verify, async (req, res) => {
    let note = await Note.findById(req.body._id);

    if (note) {
        await note.delete();
        res.json({ msg: "Note deleted" });
    } else {
        res.json({ msg: "Could not delete note" });
    }
});

module.exports = router;