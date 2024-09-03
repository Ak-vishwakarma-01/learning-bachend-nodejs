import express from 'express'
import { addcontact, deleteContact, getContactbyId, gteAllcontacts, updatContact } from '../controllers/Contact.js';

import { Authenticate } from '../middleware/auth.js';

const router = express.Router();

// // get all contact 
router.get('/',gteAllcontacts)

// //get contact by id
router.get('/:id',getContactbyId)

// // add contact
router.post('/add',Authenticate, addcontact)

// // update Contact
router.put('/:id',Authenticate,updatContact)

// //delete contact
router.delete('/:id',Authenticate,deleteContact)

export default router