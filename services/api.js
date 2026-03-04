export async function fetchRooms() {
  const images = [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    "https://images.unsplash.com/photo-1501117716987-c8e1ecb210c4",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1551776235-dde6d4829808",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
    "https://images.unsplash.com/photo-1560448075-bb485b067938",
    "https://images.unsplash.com/photo-1587985064135-0366536eab42",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    "https://images.unsplash.com/photo-1582582621959-48d27397dc69",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
  ];

  const bedTypes = ["Single", "Double", "Multiple"];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 24 }, (_, i) => ({
          id: i + 1,
          name: `Room ${i + 1}`,
          price: 2000 + i * 150,
          image: `${images[i % images.length]}?auto=format&fit=crop&w=800&q=80`,
          available: i % 3 !== 0,
          type: i % 2 === 0 ? "Deluxe" : "Suite",
          rating: 3 + (i % 3),
          bedType: bedTypes[i % 3],
        }))
      );
    }, 800);
  });
}