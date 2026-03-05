import RoomCard from "./RoomCard";

export default function RoomList({ rooms, onBook, lastRoomRef }) {

  return (

    <div className="mt-12 grid md:grid-cols-3 gap-8">

      {rooms.map((room, index) => {

        const isLast = rooms.length === index + 1;

        if (isLast) {
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