import { existsSync, mkdirSync } from "fs";


const shopsDirectory = "Shops";
if (!existsSync(shopsDirectory)) {
    mkdirSync(shopsDirectory);
}
