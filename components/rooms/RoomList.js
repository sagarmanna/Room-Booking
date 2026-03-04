import RoomCard from "./RoomCard";

export default function RoomList({ rooms, onBook, lastRoomRef }) {

  return (
    <div className="grid md:grid-cols-3 gap-6">

      {rooms.map((room, index) => {

        if (rooms.length === index + 1) {
          return (
            <div ref={lastRoomRef} key={room.id}>
              <RoomCard room={room} onBook={onBook} />
            </div>
          );
        }

        return (
          <RoomCard
            key={room.id}
            room={room}
            onBook={onBook}
          />
        );

      })}

    </div>
  );
}