export function isDateOverlap(start1, end1, start2, end2) {
  return new Date(start1) <= new Date(end2) &&
         new Date(start2) <= new Date(end1);
}