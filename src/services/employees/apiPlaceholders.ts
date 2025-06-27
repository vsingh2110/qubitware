// Placeholder functions for future API endpoints

// GET /employees/:id
export const fetchEmployeeDetails = async (id: string) => {
  // Replace with real API call
  return JSON.parse(localStorage.getItem('mockEmployees') || '[]').find((e: any) => e.id === id);
};

// GET /employees/:id/documents
export const fetchEmployeeDocuments = async (id: string) => {
  const allDocs = JSON.parse(localStorage.getItem('employeeDocuments') || '{}');
  return allDocs[id] || [];
};

// POST /employees/:id/documents
export const uploadEmployeeDocument = async (id: string, doc: any) => {
  const allDocs = JSON.parse(localStorage.getItem('employeeDocuments') || '{}');
  allDocs[id] = [...(allDocs[id] || []), doc];
  localStorage.setItem('employeeDocuments', JSON.stringify(allDocs));
  return doc;
};
