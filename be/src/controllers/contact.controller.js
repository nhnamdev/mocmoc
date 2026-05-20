const contactService = require("../services/contact.service");

async function createContact(req, res) {
  const contact = await contactService.createContact({
    ...req.validatedBody,
    ipAddress: req.ip,
    userAgent: req.get("user-agent") || null,
  });

  res.status(201).json({
    success: true,
    message: "Contact request saved",
    data: contact,
  });
}

module.exports = {
  createContact,
};
