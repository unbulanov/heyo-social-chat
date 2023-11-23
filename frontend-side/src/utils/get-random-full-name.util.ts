const fullNames: string[] = [
  "John Doe",
  "Jane Smith",
  "Emil Johnson",
  "Michael Williams",
  "Mary Brown",
  "David Jones",
  "Sarah Miller",
  "James Davis",
  "Linda Garcia",
  "Robert Wilson"
];

export function  getRandomFullName() {
  const randomIndex = Math.floor(Math.random() * fullNames.length);
  return fullNames[randomIndex];
}