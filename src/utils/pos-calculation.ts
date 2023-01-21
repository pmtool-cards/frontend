export default function (removedIndex: number, addedIndex: number, arr: any[]) {
  let pos;
  if (addedIndex === arr.length - 1) {
    pos = arr[arr.length - 1].order + 16384;
  } else if (addedIndex === 0) {
    pos = arr[0].order / 2;
  } else if (addedIndex < removedIndex) {
    let beforePOS = arr[addedIndex - 1].order;
    let afterPOS = arr[addedIndex].order;

    pos = (beforePOS + afterPOS) / 2;
  } else if (addedIndex > removedIndex) {
    let beforePOS = arr[addedIndex + 1].order;
    let afterPOS = arr[addedIndex].order;

    pos = (beforePOS + afterPOS) / 2;
  }

  return pos;
}
