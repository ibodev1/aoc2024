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

    for (const leftNum of leftNumbers) {
      const rightCount = findCountInArray(leftNum, rightNumbers);
      const calcValue = leftNum * rightCount;
      calcNumbers.push(calcValue);
    }

    const total = calcNumbers.reduce((acc, n) => acc + n, 0);

    console.log(total);
  } catch (error) {
    throw error;
  }
}

function findCountInArray(num: number, rightNumbers: number[]): number {
  return rightNumbers.filter((n) => n === num)?.length ?? 0;
}

main();
