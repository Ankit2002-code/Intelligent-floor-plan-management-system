export default function FloorPlanTable({ plans }) {
  if (!plans || plans.length === 0) return <div>No floor plans found.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2">Floor</th>
            <th className="px-4 py-2">Rooms</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(floor => (
            <tr key={floor.floorNumber} className="hover:bg-blue-50 transition">
              <td className="border px-4 py-2">{floor.floorNumber}</td>
              <td className="border px-4 py-2">
                {floor.rooms.map(room => (
                  <span
                    key={room.name}
                    className={`inline-block px-2 py-1 m-1 rounded-full text-white ${room.capacity > 20 ? "bg-red-500" : room.capacity > 10 ? "bg-yellow-500" : "bg-green-500"}`}
                  >
                    {room.name} (Capacity: {room.capacity})
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 