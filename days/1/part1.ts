import { resolve } from "@std/path";

async function main() {
  try {
    const inputPath = resolve(Deno.cwd(), "./days/1/input.txt");
    const fileText = await Deno.readTextFile(inputPath);

    const lines = fileText.split("\n");

    const leftNumbers: number[] = [];
    const rightNumbers: number[] = [];

    for (const line of lines) {
      if (line.trim() === "") continue;

      const nums = line.split("   ");

      if (!Array.isArray(nums) || nums.length !== 2) continue;

      const leftNum = Number(nums[0]);
      const rightNum = Number(nums[1]);

      leftNumbers.push(leftNum);
      rightNumbers.push(rightNum);
    }

    const calcNumbers: number[] = [];

    for (let i = 0; i < 1000; i++) {
      const leftMin = Math.min(...leftNumbers);
      const rightMin = Math.min(...rightNumbers);

      const leftIndex = leftNumbers.findIndex((n) => n === leftMin);
      const rightIndex = rightNumbers.findIndex((n) => n === rightMin);

      let calcValue = 0;

      if (rightMin > leftMin) {
        calcValue = rightMin - leftMin;
      } else if (leftMin > rightMin) {
        calcValue = leftMin - rightMin;
      } else {
        calcValue = 0;
      }

      calcNumbers.push(calcValue);

      leftNumbers.splice(leftIndex, 1);
      rightNumbers.splice(rightIndex, 1);
    }

    const total = calcNumbers.reduce((acc, n) => acc + n, 0);

    console.log(total);
  } catch (error) {
    throw error;
  }
}

main();
