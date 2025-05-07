import { useNavigate } from "react-router-dom";
import axios from "axios"

export const columns =[
    {
        name: "Sl No",
        selector : (row) => row.sno
    },
    {
        name: "Department Name",
        selector : (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector : (row) => row.action
    },

]


export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm('Do you want to delete?');
    if (confirm) {
      try {
        const response = await axios.delete(`https://employee-backend-ten-theta.vercel.app/api/department/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          onDepartmentDelete(); // This will call the function to refresh the list of departments
        } else {
          alert('Failed to delete department');
        }
      } catch (error) {
        console.error('Failed to delete department:', error);
        alert('Error occurred while deleting the department');
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        className="px-4 py-1 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded shadow transition duration-200"
        onClick={() => navigate(`/admin-dashboard/department/${Id}`)}>
        Edit
      </button>
      <button
        className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded shadow transition duration-200"
        onClick={() => handleDelete(Id)}>
        Delete
      </button>
    </div>
  );
};

  