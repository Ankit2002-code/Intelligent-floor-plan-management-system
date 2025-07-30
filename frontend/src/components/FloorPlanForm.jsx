import { useState, forwardRef, useImperativeHandle } from "react";

const FloorPlanForm = forwardRef(function FloorPlanForm({ onSubmit }, ref) {
  const [numFloors, setNumFloors] = useState(1);
  const [floors, setFloors] = useState([{ rooms: [{ name: "", capacity: 1 }] }]);

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setNumFloors(1);
      setFloors([{ rooms: [{ name: "", capacity: 1 }] }]);
    },
  }));

  const handleFloorChange = (idx, rooms) => {
    const updated = [...floors];
    updated[idx].rooms = rooms;
    setFloors(updated);
  };

  const handleNumFloors = (n) => {
    setNumFloors(n);
    setFloors(Array.from({ length: n }, (_, i) => floors[i] || { rooms: [{ name: "", capacity: 1 }] }));
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(floors);
      }}
      className="space-y-4"
    >
      <label>
        Number of Floors:
        <input
          type="number"
          min={1}
          value={numFloors}
          onChange={e => handleNumFloors(Number(e.target.value))}
          className="ml-2 border px-2 py-1"
        />
      </label>
      {floors.map((floor, i) => (
        <FloorRooms
          key={i}
          floorNum={i + 1}
          rooms={floor.rooms}
          onChange={rooms => handleFloorChange(i, rooms)}
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Submit</button>
    </form>
  );
});

function FloorRooms({ floorNum, rooms, onChange }) {
  const [localRooms, setLocalRooms] = useState(rooms);

  const handleRoomChange = (idx, field, value) => {
    const updated = localRooms.map((room, i) =>
      i === idx ? { ...room, [field]: value } : room
    );
    setLocalRooms(updated);
    onChange(updated);
  };

  const addRoom = () => {
    const updated = [...localRooms, { name: "", capacity: 1 }];
    setLocalRooms(updated);
    onChange(updated);
  };

  return (
    <div className="border p-2 rounded mb-2">
      <div className="font-semibold mb-1">Floor {floorNum}</div>
      {localRooms.map((room, i) => (
        <div key={i} className="flex gap-2 mb-1">
          <input
            type="text"
            placeholder="Room Name"
            value={room.name}
            onChange={e => handleRoomChange(i, "name", e.target.value)}
            className="border px-2 py-1"
            required
          />
          <input
            type="number"
            min={1}
            placeholder="Capacity"
            value={room.capacity}
            onChange={e => handleRoomChange(i, "capacity", Number(e.target.value))}
            className="border px-2 py-1"
            required
          />
        </div>
      ))}
      <button type="button" onClick={addRoom} className="text-blue-600 hover:underline">+ Add Room</button>
    </div>
  );
}

export default FloorPlanForm; 