const stepOneFields = [
  {
    name: "notify_candidate",
    label: "E-mail Notification to candidate",
    type: "select",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    name: "notify_client",
    label: "E-mail Notification to client",
    type: "select",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    name: "notify_admin",
    label: "E-mail Notification to admin",
    type: "select",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    name: "form_filled_by",
    label: "Form Filled By",
    type: "select",
    options: [
      { label: "Candidate", value: "Candidate" },
      { label: "Data Internal Team", value: "Data Internal Team" },
    ],
  },
  {
    name: "client_id",
    label: "Company (Auto Assign to Client Portal)",
    type: "text",
  },
  {
    name: "process",
    label: "Process (Auto Assign to Client Portal)",
    type: "text",
  },
  { name: "name", label: "Candidate Name", type: "text" },
  { name: "dob", label: "Candidate DOB", type: "date" },
  { name: "father_name", label: "Candidate Father’s Name", type: "text" },
  { name: "mobile_no", label: "Candidate Mobile No", type: "text" },
  { name: "email_id", label: "Candidate Email ID", type: "email" },
  { name: "client_location", label: "Company Location", type: "text" },
];

const isGenInfoComplete = (formData) => {
  for (let field of stepOneFields) {
    if (
      !["form_filled_by", "process"].includes(field.name) &&
      [null, undefined, ""].includes(formData[field.name])
    ) {
      return false;
    }
  }
  return true;
};

export { isGenInfoComplete };
