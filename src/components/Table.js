import { useContext } from "react";
import { VigenereContext } from "../App";

const Table = () => {
  const { letters, table, col, row } = useContext(VigenereContext);

  return (
    <table>
      {letters.split("").map((_, i) => (
        <tr
          key={i}
          className={`border-b-2 last:border-b-0 ${
            i === row ? "bg-red-500" : "bg-transparent"
          }`}
        >
          {letters.split("").map((_, j) => (
            <td
              key={j}
              className={`border-skin min-w-[20px] min-h-[20px] border-r-2 text-skin text-center text-xs last:border-r-0 ${
                i === row && j === col
                  ? "bg-purple-500"
                  : j === col
                  ? "bg-red-500"
                  : "bg-transparent"
              }`}
            >
              {table[i][j]}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default Table;
