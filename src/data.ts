export const checkBoxesInit = [
  {
    id: 1,
    label: "Select All",
    checked: false,
    children: [
      { id: 2, label: "Option A", checked: false },
      {
        id: 3,
        label: "Option B",
        checked: false,
        children: [
          { id: 4, label: "Option B1", checked: false },
          { id: 5, label: "Option B2", checked: false },
        ],
      },
      { id: 6, label: "Option C", checked: false },
      {
        id: 7,
        label: "Option D",
        checked: false,
        children: [
          { id: 8, label: "Option D1", checked: false },
          { id: 9, label: "Option D2", checked: false },
        ],
      },
    ],
  },
];
