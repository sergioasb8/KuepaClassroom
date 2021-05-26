const { Router } = require('express');
const router = Router();
const Message = require('../models/MessageModel.js');

router.route('/')
    /** ---------- 
    *   Saving messages
    -------------- */
    .post(async (req, res) => {

        try {
            const { author, message } = req.body;

            const newMessage = new Message({
                author, message
            });

            const savedMessage = await newMessage.save();

            res.json('Message saved');
        }
        // in case an error happen
        catch(err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = router;