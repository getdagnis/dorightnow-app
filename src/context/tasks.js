export const fetchedTasks =
  localStorage.getItem("dorightnowTasks") &&
  typeof JSON.parse(localStorage.getItem("dorightnowTasks")) === "object" &&
  JSON.parse(localStorage.getItem("dorightnowTasks")).length > 1
    ? JSON.parse(localStorage.getItem("dorightnowTasks"))
    : [];

// export const done =
//   localStorage.getItem("dorightnowDoneTasks") &&
//   typeof JSON.parse(localStorage.getItem("dorightnowDoneTasks")) === "object" &&
//   JSON.parse(localStorage.getItem("dorightnowDoneTasks")).length > 1
//     ? JSON.parse(localStorage.getItem("dorightnowDoneTasks"))
//     : [];

// export const tasks = [
//   { id: 1, task: "Jāuztaisa Reinim tās Open Minded skices", cat: "a", type: "todo" },
//   { id: 2, task: "do nothing", cat: "b", type: "todo" },
//   {
//     id: 3,
//     task:
//       "Don't eat too much bbq ribs. Finish the front-end of the do right now app, so that we can all finally do our tasks",
//     cat: 0,
//     type: "todo",
//   },
//   {
//     id: 4,
//     task: "drink some wine, watch some movies, read a book and go to sleep",
//     cat: "c",
//     type: "todo",
//   },
//   { id: 5, task: "do something", cat: "a", type: "todo" },
//   {
//     id: 6,
//     task:
//       "Don't eat too much bbq ribs. Finish the front-end of the do right now app, so that we can all finally do our tasks",
//     cat: "d",
//     type: "todo",
//   },
// ];
// [
// {
//   id: 4,
//   task: "drink some wine, watch some movies, read a book and go to sleep",
//   cat: "c",
//   type: "done",
// },
// { id: 5, task: "do something", cat: "a", type: "done" },
// {
//   id: 6,
//   task:
//     "Don't eat too much bbq ribs. Finish the front-end of the do right now app, so that we can all finally do our tasks",
//   cat: 0,
//   type: "done",
// },
// ];
