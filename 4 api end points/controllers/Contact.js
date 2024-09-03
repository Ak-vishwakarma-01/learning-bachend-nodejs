import { Contact } from "../models/contact.js";

// get all contacts 
export const gteAllcontacts = async (req, res) => {
    try {
        const usercontacts = await Contact.find();
        if (!usercontacts.length) return res.status(404).json({ message: "No contacts found", usercontacts });
        res.json({ message: "Contacts fetched", usercontacts });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch contacts", error: err.message });
    }
}

// get contact by id

export const getContactbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const userContact = await Contact.findById(id);
        if (!userContact) return res.status(404).json({ message: "No contact found" });
        res.json({ message: "Contact fetched", userContact });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch contact", error: err.message });
    }
}

// Add new Contact
export const addcontact = async (req, res) => {
    const { name, email, phone, type } = req.body;
    if(name === '' || email === '' || phone === '' || type === '') 
        return res.json({ message: "All fields are required" });      
    try {
        const saveContact = await Contact.create({ name, email, phone, type });
        res.json({ message: "Contact has been saved", saveContact });
    } catch (err) {
        res.status(500).json({ message: "Failed to save contact", error: err.message });
    }
}

// update contact 
export const updatContact = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, phone, type } = req.body;
        const updatecontact = await Contact.findByIdAndUpdate(id, { name, email, phone, type }, { new: true });

        if (!updatecontact) return res.status(404).json({ message: "No contact found" });
        res.json({ message: "Contact updated successfully", updatecontact });
    } catch (err) {
        res.status(500).json({ message: "Failed to update contact", error: err.message });
    }
}

// delete Contact 
export const deleteContact = async (req, res) => {
    try {
        const id = req.params.id;
        const deletecontact = await Contact.findByIdAndDelete(id);
        if (!deletecontact) return res.status(404).json({ message: "contact not exist" })
        res.json({ message: "contact deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

