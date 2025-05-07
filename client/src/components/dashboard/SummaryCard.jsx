import React from 'react'

const SummaryCard = ({ icon, number, text,color }) => {
  return (
    <div className="flex items-center bg-white rounded-xl shadow p-4 hover:shadow-md transition duration-300">
      <div className={`text-3xl ${color} text-white rounded-full w-14 h-14 flex items-center justify-center`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-gray-600 text-sm">{text}</p>
        <p className="text-2xl font-bold">{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard
