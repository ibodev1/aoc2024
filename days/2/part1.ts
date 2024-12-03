import { resolve } from "@std/path";

async function main() {
  try {
    const inputPath = resolve(Deno.cwd(), "./days/2/input.txt");
    const fileText = await Deno.readTextFile(inputPath);

    const lines = fileText.split("\n");

    const numbers = new Map<number, number[]>([]);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim() === "") continue;

      const nums = line.split(" ").map(Number).filter((n) => !Number.isNaN(n));

      if (!Array.isArray(nums) || nums.length === 0) continue;

      numbers.set(i, nums);
    }

    console.log(numbers.size);

    let safeCount: number = 0;

    for (const [_, nums] of numbers) {
      let lastNum: number = -1;
      let isSafe: boolean = false;
      let orderType: "decreasing" | "increasing" | undefined = undefined;

      for (const num of nums) {
        if (lastNum < 0) {
          lastNum = num;
          continue;
        }

        if (!orderType) {
          orderType = lastNum < num ? "increasing" : "decreasing";
        }

        if (lastNum === num) {
          isSafe = false;
          break;
        }

        if (orderType === "increasing" && num < lastNum) {
          isSafe = false;
          break;
        } else if (orderType === "decreasing" && num > lastNum) {
          isSafe = false;
          break;
        }

        if (
          lastNum > num &&
          lastNum - 1 !== num && lastNum - 2 !== num && lastNum - 3 !== num
        ) {
          isSafe = false;
          break;
        } else if (
          lastNum < num &&
          lastNum + 1 !== num && lastNum + 2 !== num && lastNum + 3 !== num
        ) {
          isSafe = false;
          break;
        }

        isSafe = true;

        lastNum = num;
      }

      if (isSafe) {
        safeCount++;
      }
    }

    console.log(safeCount);
  } catch (error) {
    throw error;
  }
}

main();
