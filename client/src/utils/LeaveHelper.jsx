import { useNavigate } from "react-router-dom"


export const columns =[
    {
        name: "Sl No",
        selector : (row) => row.sno,
        width : "70px",
        center: true
    },
    {
        name: "Emp ID",
        selector : (row) => row.employeeId,
        sortable: true,
        width: "120px",
        center: true
    },
    {
      name: "Name",
      selector : (row) => row.name,
       width: "120px",
       center: true
  },
    {
        name: "Leave Type",
        selector : (row) => row.leaveType,
         width: "140px",
         center: true
    },
    {
      name: "Department",
      selector : (row) => row.department,
      width: "170px",
      center: true
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "80px",
    center: true
  }, 
  {
    name: "Status",
    selector: (row) => row.status,
    width: "120px",
    center: true
  }, 
  {
    name: "Action",
    selector: (row) => row.action,
    center: true
  }, 

]


export const LeaveButtons = ({Id}) => {
    const navigate = useNavigate()

    const handleView = (id) => {
        navigate(`/admin-dashboard/leaves/${id}`)
    }
    return (
        <button className="px-4 bg-teal-500 rounded text-white hover:bg-teal"
        onClick={() => handleView(Id)}>
                View
        </button>
    )
}
