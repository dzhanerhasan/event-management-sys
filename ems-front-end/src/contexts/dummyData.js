// dummyData.js

const dummyData = [...Array(24)].map((_, i) => ({
  id: i + 1,
  title: `Event ${i + 1}`,
  location: `Location ${i + 1}`,
  date: `2023-05-${String(i + 1).padStart(2, "0")}`,
  time: "18:00",
  description: `Description for Event ${i + 1}`,
  attendees: ["John", "Jane", "Michael", "Olivia"],
  created_by: "User1",
}));

export default dummyData;
